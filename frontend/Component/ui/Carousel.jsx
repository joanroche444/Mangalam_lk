import React from "react";

export function Carousel({ children, className }) {
  return <div className={`relative overflow-hidden ${className}`}>{children}</div>;
}

export function CarouselContent({ children }) {
  return <div className="flex">{children}</div>;
}

export function CarouselItem({ children }) {
  return <div className="w-full flex-shrink-0">{children}</div>;
}

export function CarouselPrevious({ onClick }) {
  return <button className="absolute left-0 p-2 bg-gray-200" onClick={onClick}>{"<"}</button>;
}

export function CarouselNext({ onClick }) {
  return <button className="absolute right-0 p-2 bg-gray-200" onClick={onClick}>{">"}</button>;
}