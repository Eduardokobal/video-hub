type SectionHeadingProps = {
  eyebrow: string;
  title: string;
};

export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="mb-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-purple-500">
        {eyebrow}
      </p>
      <h2 className="text-xl font-semibold text-purple-50">{title}</h2>
    </div>
  );
}
