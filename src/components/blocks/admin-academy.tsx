"use client";

import * as React from "react";
import { cn } from "../ui/lib/utils";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

const DEFAULT_COURSES = [
  { title: "Scanner Gate Basics", lessons: "8 LESSONS", done: 100, certified: true },
  { title: "VIP Hospitality Craft", lessons: "12 LESSONS", done: 64, certified: false },
  { title: "Crowd Flow Control", lessons: "6 LESSONS", done: 32, certified: false },
];

export interface AdminAcademyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    title?: string;
  subtitle?: string;
  courses?: typeof DEFAULT_COURSES;
  onAction?: (action: string) => void;
}

export function AdminAcademy({ title, courses = DEFAULT_COURSES, className, onAction, ...props }: AdminAcademyProps) {
  const [notice, setNotice] = React.useState<string | null>(null);
  return (
    <div className={cn("w-full space-y-4", className)} {...props}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">SCHOOL // ACADEMY</p>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">{title ?? "Crew courses"}</h2>
        </div>
        <div className="flex items-center gap-2">
          {notice && <span role="status" className="font-mono text-[10px] uppercase tracking-wider text-accent">{notice}</span>}
          <Button size="sm" onClick={() => { setNotice("Course assignment queued."); onAction?.("assign-course"); }}>Assign course</Button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.title} className="min-w-0">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <Badge variant="outline">{course.lessons}</Badge>
                {course.certified ? <Badge variant="accent">CERTIFIED</Badge> : <Badge variant="default">IN STUDY</Badge>}
              </div>
              <CardTitle className="text-base">{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>Progress</span>
                <span className="font-bold text-foreground">{course.done}%</span>
              </div>
              <Progress value={course.done} />
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  const act = course.certified ? "view-certificate" : "continue-study";
                  setNotice(`${course.title}: ${course.certified ? "certificate opened" : "lesson resumed"}.`);
                  onAction?.(act);
                }}
              >
                {course.certified ? "View certificate" : "Continue study"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
