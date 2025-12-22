import { InfiniteScrollSection } from "./infinite-scroll-section"

export const LongContentWrapper = () => {
  // Create 50 sections (each ~200px, total ~10,000px)
  const sections = Array.from({ length: 50 }, (_, i) => i)

  return (
    <div>
      {sections.map((sectionId) => (
        <InfiniteScrollSection 
          key={sectionId} 
          sectionId={sectionId}
        />
      ))}
    </div>
  )
}