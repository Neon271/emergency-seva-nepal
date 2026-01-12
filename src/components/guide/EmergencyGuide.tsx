
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const guideData = [
  {
    id: "earthquake",
    title: "During an Earthquake",
    content: [
      "DROP to the ground.",
      "Take COVER by getting under a sturdy table or other piece of furniture.",
      "HOLD ON until the shaking stops.",
      "If there isn’t a table or desk near you, cover your face and head with your arms and crouch in an inside corner of the building.",
      "Stay away from glass, windows, outside doors and walls, and anything that could fall.",
      "Stay inside until the shaking stops and it is safe to go outside. Do not exit a building during the shaking.",
    ],
  },
  {
    id: "flood",
    title: "During a Flood",
    content: [
      "Move immediately to higher ground.",
      "Do not walk, swim, or drive through flood waters. Turn Around, Don’t Drown!",
      "Just six inches of moving water can knock you down, and one foot of moving water can sweep your vehicle away.",
      "Stay off bridges over fast-moving water.",
      "Listen to the authorities for information and instructions.",
    ],
  },
  {
    id: "snake_bite",
    title: "In Case of a Snake Bite",
    content: [
        "Remain calm and move away from the snake.",
        "Remove tight clothing and jewelry before you start to swell.",
        "Keep the bite area below the level of the heart.",
        "Clean the wound with soap and water.",
        "Do NOT cut the wound or attempt to suck out the venom.",
        "Do NOT apply a tourniquet or ice.",
        "Seek medical attention as soon as possible. Try to remember the snake's color and shape.",
    ],
  },
    {
    id: "road_accident",
    title: "In Case of a Road Accident",
    content: [
        "Check the scene for safety before approaching.",
        "Call for medical help immediately.",
        "If the person is unconscious or has a neck/back injury, do not move them unless they are in immediate danger.",
        "Stop any bleeding by applying firm pressure with a clean cloth.",
        "Keep the person warm.",
        "Do not give them anything to eat or drink.",
    ],
  },
  {
    id: "fire",
    title: "In Case of Fire",
    content: [
        "If you see a small fire, use a fire extinguisher if you are trained to do so. Remember PASS: Pull, Aim, Squeeze, Sweep.",
        "If the fire is large or spreading, evacuate immediately.",
        "Feel doors for heat before opening them. If a door is hot, use an alternate exit.",
        "Stay low to the ground to avoid smoke inhalation.",
        "Once you are out, stay out. Never go back into a burning building.",
        "Call the fire department from a safe location.",
    ],
  },
];

export default function EmergencyGuide() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
                <BookOpen className="h-7 w-7 text-accent" />
                Emergency Preparedness Guide
            </CardTitle>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
            {guideData.map((item) => (
                <AccordionItem value={item.id} key={item.id}>
                <AccordionTrigger className="text-lg font-semibold hover:no-underline text-left">
                    {item.title}
                </AccordionTrigger>
                <AccordionContent className="prose prose-sm max-w-none pl-2 text-muted-foreground">
                    <ul className="list-disc space-y-2 pl-5">
                    {item.content.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                    </ul>
                </AccordionContent>
                </AccordionItem>
            ))}
            </Accordion>
        </CardContent>
    </Card>
  );
}
