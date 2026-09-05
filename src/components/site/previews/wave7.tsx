"use client";

import * as React from "react";
import { Carousel } from "@/components/ui/carousel";
import { AudioPlayer } from "@/components/ui/audio-player";
import { VideoPlayer } from "@/components/ui/video-player";
import { Playlist } from "@/components/ui/playlist";
import { VolumeSlider } from "@/components/ui/volume-slider";
import { PodcastPlayer } from "@/components/ui/podcast-player";
import { VideoThumbnail } from "@/components/ui/video-thumbnail";
import { MediaControls } from "@/components/ui/media-controls";
import { LiveBadge } from "@/components/ui/live-badge";

export const wave7Previews: Record<string, React.ComponentType> = {
  "audio-player": () => {
    return (
      <AudioPlayer
        title="STAGE LIVE RECORDING"
        artist="ORCHESTRA ROW C"
        duration={210}
        cover="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='18' fill='%236b7280'/%3E%3Ccircle cx='20' cy='20' r='12' fill='none' stroke='%23fff' stroke-width='2'/%3E%3C/svg%3E"
      />
    );
  },

  "video-player": () => {
    return (
      <VideoPlayer
        title="MIDNIGHT CINEMA"
        duration={125}
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%23232323'/%3E%3C/svg%3E"
      />
    );
  },

  playlist: () => {
    return (
      <Playlist
        tracks={[
          { id: "1", title: "Midnight City", artist: "M83", duration: 245 },
          { id: "2", title: "Electric Feel", artist: "MGMT", duration: 212 },
          { id: "3", title: "Sunset Lover", artist: "Mild High Club", duration: 189 },
        ]}
        activeId="2"
        onPlay={() => {}}
      />
    );
  },

  "volume-slider": () => {
    return (
      <VolumeSlider
        value={0.7}
        onValueChange={() => {}}
        orientation="horizontal"
      />
    );
  },

  "podcast-player": () => {
    return (
      <PodcastPlayer
        title="THE INSIDER PODCAST"
        episodes={[
          { id: "1", title: "Episode 1: The Beginning" },
          { id: "2", title: "Episode 2: The Journey" },
          { id: "3", title: "Episode 3: The End" },
        ]}
        activeId="2"
        onPlay={() => {}}
      />
    );
  },

  "video-thumbnail": () => {
    return (
      <VideoThumbnail
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%23232323'/%3E%3C/svg%3E"
        duration={120}
        title="Midnight Movie"
      />
    );
  },

  "media-controls": () => {
    return (
      <MediaControls
        playing={true}
        onToggle={() => {}}
        onNext={() => {}}
        onPrev={() => {}}
        onStop={() => {}}
        progress={45}
      />
    );
  },

  "live-badge": () => {
    return (
      <LiveBadge
        viewers={128}
        variant="full"
      />
    );
  },
};