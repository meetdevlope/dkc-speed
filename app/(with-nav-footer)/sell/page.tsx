import MaxWidthWrapper from "components/MaxWidthWrapper";
import { getPageConfig, SectionConfig } from "../[slug]/action";
import { jsonParser } from "utils/helpers";
import { Suspense } from "react";
import LoadingSection from "../[slug]/components/LoadingSection";
import WidgetWrapper from "components/cms/section/preview/WidgetWrapper";
import LazyLoadSectionTrigger from "../[slug]/components/LazyLoadSectionTrigger";

const page = async () => {
  const INITIAL_SECTIONS = 3;

  const pageConfig = await getPageConfig("sell");

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
};

export default page;
