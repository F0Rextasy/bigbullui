"use client";

import * as React from "react";
import { cn } from "./lib/utils";

/**
 * ImageCrop - canvas-based image cropping with pointer events
 */
interface ImageCropProps {
  src: string;
  aspect?: number;
  onCrop?: (dataUrl: string) => void;
}

/**
 * Get natural image dimensions
 */
const getImageNaturalSize = (src: string): Promise<{ width: number; height: number }> => {
  const { promise, resolve, reject } = Promise.withResolvers<{ width: number; height: number }>();
  const img = new Image();
  img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
  img.onerror = () => reject(new Error("Failed to load image"));
  img.src = src;
  return promise;
};

export const ImageCrop = React.forwardRef<HTMLDivElement, ImageCropProps>(
  function ImageCrop(props, ref) {
    const { src, aspect, onCrop } = props;
    const [imageWidth, setImageWidth] = React.useState(0);
    const [imageHeight, setImageHeight] = React.useState(0);
    const [dataUrl, setDataUrl] = React.useState<string | null>(null);
    const [cropRect, setCropRect] = React.useState<{ x: number; y: number; w: number; h: number }>({ x: 0, y: 0, w: 0, h: 0 });
    const [isResizing, setIsResizing] = React.useState<boolean>(false);
    const [resizeHandle, setResizeHandle] = React.useState<'nw' | 'ne' | 'sw' | 'se' | null>(null);
    const [selection, setSelection] = React.useState<{ x: number; y: number; w: number; h: number }>({ x: 0, y: 0, w: 0, h: 0 });

    // Load image dimensions
    React.useEffect(() => {
      getImageNaturalSize(src).then((dim: { width: number; height: number }) => {
        setImageWidth(dim.width);
        setImageHeight(dim.height);
      }).catch(() => {
        // image failed to load; leave dimensions at 0
      });
    }, [src]);

    // Calculate scaled dimensions based on aspect ratio
    const [displayWidth, setDisplayWidth] = React.useState(imageWidth);
    const [displayHeight, setDisplayHeight] = React.useState(imageHeight);

    React.useEffect(() => {
      if (aspect && (imageWidth > 0 && imageHeight > 0)) {
        // Fit within reasonable display bounds
        const maxW = 400;
        const maxH = 400 / aspect * aspect;
        setDisplayWidth(Math.min(imageWidth, maxW));
        setDisplayHeight(Math.min(imageHeight, maxH));
      } else {
        setDisplayWidth(imageWidth);
        setDisplayHeight(imageHeight);
      }
    }, [aspect, imageWidth, imageHeight]);

    // Handle pointer events for crop rect dragging and resizing
    const handlePointerDown = (e: React.PointerEvent, handle: typeof resizeHandle) => {
      e.preventDefault();
      setIsResizing(true);
      setResizeHandle(handle);

      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const startX = e.clientX - rect.left;
      const startY = e.clientY - rect.top;

      const moveHandler = (e: React.PointerEvent) => {
        e.preventDefault();
        if (!isResizing || resizeHandle === null) return;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        switch (resizeHandle) {
          case 'nw':
            setCropRect(prev => ({
              x: Math.max(0, prev.x + dx),
              y: Math.max(0, prev.y + dy),
              w: Math.max(1, prev.w - dx),
              h: Math.max(1, prev.h - dy),
            }));
            break;
          case 'ne':
            setCropRect(prev => ({
              x: Math.max(0, prev.x),
              y: Math.max(0, prev.y + dy),
              w: Math.max(1, prev.w + dx),
              h: Math.max(1, prev.h - dy),
            }));
            break;
          case 'sw':
            setCropRect(prev => ({
              x: Math.max(0, prev.x + dx),
              y: Math.max(0, prev.y),
              w: Math.max(1, prev.w - dx),
              h: Math.max(1, prev.h + dy),
            }));
            break;
          case 'se':
            setCropRect(prev => ({
              x: Math.max(0, prev.x),
              y: Math.max(0, prev.y),
              w: Math.max(1, prev.w + dx),
              h: Math.max(1, prev.h + dy),
            }));
            break;
        }
      };

      const upHandler = (e: React.PointerEvent) => {
        e.preventDefault();
        setIsResizing(false);
        setResizeHandle(null);
        window.removeEventListener("pointermove", moveHandler as unknown as EventListener);
        window.removeEventListener("pointerup", upHandler as unknown as EventListener);
      };

      window.addEventListener("pointermove", moveHandler as unknown as EventListener);
      window.addEventListener("pointerup", upHandler as unknown as EventListener);
    };

    // Crop canvas and generate dataURL
    const handleCrop = () => {
      if (cropRect.w < 10 || cropRect.h < 10) return;

      const canvas = document.createElement("canvas");
      canvas.width = cropRect.w;
      canvas.height = cropRect.h;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Draw the cropped portion of the image
        // The image is displayed at displayWidth x displayHeight
        // Map crop rect from display space to image space
        const scaleX = imageWidth / displayWidth;
        const scaleY = imageHeight / displayHeight;

        const sx = cropRect.x * scaleX;
        const sy = cropRect.y * scaleY;
        const sw = cropRect.w * scaleX;
        const sh = cropRect.h * scaleY;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const imgEl = document.querySelector<HTMLImageElement>(`img[data-src="${src}"]`);
        if (!imgEl) return;
        ctx.drawImage(
          imgEl,
          sx, sy, sw, sh,
          0, 0, canvas.width, canvas.height,
        );
      }

      setDataUrl(canvas.toDataURL("image/png"));
      onCrop?.(canvas.toDataURL("image/png"));
    };

    if (imageWidth === 0 || imageHeight === 0) {
      return (
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center justify-center h-64 bg-muted/50 text-muted-foreground">
            Loading image...
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn("relative w-full rounded-lg overflow-hidden border border-border", "motion-reduce:transition-none", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring")}>
        <img
          src={src}
          data-src={src}
          className={cn(
            "block w-full h-auto",
            "motion-reduce:transition-none",
          )}
          alt="Crop source"
        />

        {/* Crop rectangle with dashed frame */}
        <div
          className={cn(
            "absolute inset-0 pointer-events-none",
            "motion-reduce:animate-none",
          )}
        >
          {/* Rule of thirds grid lines */}
          <div
            className={cn(
              "absolute inset-0 overflow-hidden",
              "after:block after:w-1 after:h-[1px] after:bg-border/50 after:content-['']",
              "after:mr-1/3 after:mb-1/3",
              "after:rotate-90 after:absolute after/inset-1/3 after:h-full after:w-full",
              "motion-reduce:transition-none",
            )}
            style={{ backgroundImage: "linear-gradient(to bottom, currentColor 1px, transparent 1px), linear-gradient(to right, currentColor 1px, transparent 1px)" }}
          />
          {/* Crop rect dashed frame */}
          <div
            className={cn(
              "absolute inset-2 pointer-events-auto select-none",
              "rounded-lg",
              "outline-2 outline-dashed outline-border/60",
              "transition-all duration-200",
              "group-hover:-translate-y-0.5 group-focus-within:-translate-y-0.5",
              "motion-reduce:transition-none",
              isResizing && "animate-[pulse_1s_ease-in_out]",
            )}
            style={{
              left: `${cropRect.x}px`,
              top: `${cropRect.y}px`,
              width: `${cropRect.w}px`,
              height: `${cropRect.h}px`,
            }}
          />
        </div>

        {/* Resize handles */}
        {cropRect.w >= 20 && cropRect.h >= 20 && (
          <div
            className={cn(
              "absolute pointer-events-auto select-none",
              "w-2 h-2 rounded-full border-2 border-border",
              "motion-reduce:animate-none",
              "transition-transform duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "cursor-nwse:active:scale-[0.97] cursor-nesw:active:scale-[0.97]",
            )}
            style={{
              left: `${cropRect.x}px`,
              top: `${cropRect.y}px`,
              width: `${cropRect.w > 0 ? cropRect.w : 20}px`,
              height: `${cropRect.h > 0 ? cropRect.h : 20}px`,
            }}
            onPointerDown={e => handlePointerDown(e, 'nw')}
            onPointerUp={e => setIsResizing(false)}
            onPointerLeave={e => setIsResizing(false)}
          />
        )}

        {/* Corner handles */}
        {/* NW handle */}
        {isResizing && resizeHandle === 'nw' && (
          <div className="absolute -top-1 -left-1 w-4 h-4 bg-primary/20 rounded-md animate-pulse" />
        )}
        {/* NE handle */}
        {isResizing && resizeHandle === 'ne' && (
          <div className="absolute -top-1 right-1 w-4 h-4 bg-primary/20 rounded-md animate-pulse" />
        )}
        {/* SW handle */}
        {isResizing && resizeHandle === 'sw' && (
          <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-primary/20 rounded-md animate-pulse" />
        )}
        {/* SE handle */}
        {isResizing && resizeHandle === 'se' && (
          <div className="absolute -bottom-1 right-1 w-4 h-4 bg-primary/20 rounded-md animate-pulse" />
        )}

      {/* Crop button overlay */}
      {dataUrl === null && (
        <div
          className={cn(
            "absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2",
            "motion-reduce:animate-none",
          )}
        >
          <button
            onClick={handleCrop}
            className={cn(
              "px-3 py-1 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "transition-colors duration-200",
            )}
            disabled={cropRect.w < 10 || cropRect.h < 10}
            title="Crop"
          >
            Crop
          </button>
          <span className="text-xxs text-muted-foreground">
            {cropRect.w >= 10 && cropRect.h >= 10 ? "drag to adjust" : "select area"}
          </span>
        </div>
      )}
      </div>
    );
  },
);
ImageCrop.displayName = "ImageCrop";

