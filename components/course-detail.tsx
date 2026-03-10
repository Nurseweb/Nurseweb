"use client"

import { Course } from "@/lib/courses-data"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, BookOpen } from "lucide-react"

interface CourseDetailProps {
  course: Course
  onBack: () => void
  onStartQuiz: () => void
  language: "en" | "mn"
}

export default function CourseDetail({ course, onBack, onStartQuiz, language }: CourseDetailProps) {
  const isEnglish = language === "en"
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onBack}
          className="shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="sr-only">{isEnglish ? "Back" : "Буцах"}</span>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {isEnglish ? course.content.title : course.content.titleMn}
          </h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {course.lessons} {isEnglish ? "lessons" : "хичээл"}
            </span>
          </div>
        </div>
      </div>

      {/* Course Image */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary">
        <img 
          src={course.image} 
          alt={isEnglish ? course.title : course.titleMn}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Course Content Sections */}
      <div className="space-y-8">
        {course.content.sections.map((section, index) => (
          <div 
            key={index} 
            className="bg-card border border-border rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {index + 1}. {isEnglish ? section.heading : section.headingMn}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {isEnglish ? section.body : section.bodyMn}
            </p>
          </div>
        ))}
      </div>

      {/* Quiz Section */}
      <div className="bg-secondary/50 border border-border rounded-xl p-8 text-center">
        <h3 className="text-xl font-bold text-foreground mb-2">
          {isEnglish ? "Ready to Test Your Knowledge?" : "Мэдлэгээ шалгахад бэлэн үү?"}
        </h3>
        <p className="text-muted-foreground mb-6">
          {isEnglish 
            ? "Take a 10-question quiz to test what you've learned from this course."
            : "Энэ хичээлээс юу сурснаа шалгахын тулд 10 асуулттай шалгалт өгнө үү."}
        </p>
        <Button 
          onClick={onStartQuiz}
          size="lg"
          className="px-8"
        >
          {isEnglish ? "Start Quiz" : "Шалгалт эхлүүлэх"}
        </Button>
      </div>
    </div>
  )
}
