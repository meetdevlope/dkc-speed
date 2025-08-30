import WidgetWrapper from "components/cms/section/preview/WidgetWrapper";
import MaxWidthWrapper from "components/MaxWidthWrapper";
import { Suspense } from "react";
import { jsonParser } from "utils/helpers";
import { getPageConfig, SectionConfig } from "./action";
import LazyLoadSectionTrigger from "./components/LazyLoadSectionTrigger";
import LoadingSection from "./components/LoadingSection";

interface CustomPageSlugProps {
  params: {
    slug: string;
  };
}

export default async function CustomPageSlug({ params }: CustomPageSlugProps) {
  const { slug } = params;
  const INITIAL_SECTIONS = 3;

  const pageConfig = await getPageConfig(slug);

  const allSections: SectionConfig[] =
    jsonParser(pageConfig?.sectionList) || [];

  if (!allSections.length) {
    return (
      <MaxWidthWrapper>
        <div className="py-10 text-center">No sections found</div>
      </MaxWidthWrapper>
    );
  }

  return (
    <div>
      {allSections.slice(0, INITIAL_SECTIONS).map((section, index) => (
        <Suspense
          key={`initial-${section.sectionId || index}`}
          fallback={<LoadingSection />}
        >
          <WidgetWrapper sectionConfig={section} />
        </Suspense>
      ))}

      {allSections.slice(INITIAL_SECTIONS).map((section, index) => {
        const sectionIndex = INITIAL_SECTIONS + index;
        return (
          <LazyLoadSectionTrigger
            key={`lazy-${section.sectionId || index}`}
            index={sectionIndex}
          >
            <Suspense fallback={<LoadingSection />}>
              <WidgetWrapper sectionConfig={section} />
            </Suspense>
          </LazyLoadSectionTrigger>
        );
      })}
    </div>
  );
}
