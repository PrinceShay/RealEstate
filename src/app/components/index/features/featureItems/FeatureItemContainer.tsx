import React from "react";

export default function FeatureItemContainer({
  className,
  content,
}: {
  className?: string;
  content: any;
}) {
  const defaultClasses =
    "rounded-2xl overflow-hidden border border-gray-light dark:border-gray-dark hover:-translate-y-2 shadow-2xl transition-transform ease-out duration-300";

  return (
    <article className={`${defaultClasses} ${className ? className : " "}`}>
      {content}
    </article>
  );
}
