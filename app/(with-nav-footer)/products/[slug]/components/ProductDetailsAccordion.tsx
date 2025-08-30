import FAQ from "components/cms/section/preview/FAQ";
import { jsonParser } from "utils/helpers";
import { getConfig } from "../action";
import { FaqwidgetModel } from "types/cms/component.types";

const ProductDetailsAccordion = async () => {
  const data = await getConfig("product_config");
  const productConfig: ProductConfig = jsonParser(data?.json);

  const config = {
    faqId: productConfig?.faqId,
    hideTitle: true,
    hideDescription: true,
  };

  return (
    <div className="mt-4">
      <FAQ widgetConfig={config as FaqwidgetModel} />
    </div>
  );
};

export default ProductDetailsAccordion;

interface ProductConfig {
  faqId: string;
}
