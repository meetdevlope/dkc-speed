import { getEnvironmentalFootprint } from "app/(with-nav-footer)/products/[slug]/action";
import {
  CarbonEmissionIcon,
  EnergyIcon,
  EnvironmentalFootprintData,
  FreshWaterIcon,
  WaterSavedIcon,
} from "app/(with-nav-footer)/products/[slug]/components/EnvironmentalFootprint";
import Accordion from "components/Accordion";
import Breadcrumbs, { BreadcrumbTypes } from "components/Breadcrumbs";
import PageHeader from "components/PageHeader";
import { EnvironmentalFootprintTypes } from "enums/environmentalFootprint.enum";
import dynamic from "next/dynamic";
import { getToken } from "utils/getToken";
import { ROUTES } from "utils/routes";
import ImpactCard from "./components/ImpactCard";
const TrustBadges = dynamic(
  () => import("../../../shop/components/TrustBadges"),
);

const MyImpactScreen = async () => {
  const token = getToken();
  const data = await getEnvironmentalFootprint(
    token || "",
    EnvironmentalFootprintTypes.USER,
  );

  const impactData: EnvironmentalFootprintData[] = [
    {
      title: "Carbon emission saved",
      value: data?.co2e_footprint_kg || 0,
      icon: CarbonEmissionIcon,
      suffix: "kg CO2",
    },
    {
      title: "Energy saved",
      value: data?.cumulative_energy_demand_mj || 0,
      icon: EnergyIcon,
      suffix: "MJ",
    },
    {
      title: "Water saved",
      value: data?.eutrophication_footprint_m3 || 0,
      icon: WaterSavedIcon,
      suffix: "m3",
    },
    {
      title: "Freshwater nutrient pollution saved",
      value: data?.water_scarcity_footprint_g_peq || 0,
      icon: FreshWaterIcon,
      suffix: "kg P - Eq",
    },
  ];

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <PageHeader>My Impact</PageHeader>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {impactData?.map((item, index) => (
            <ImpactCard key={index} {...item} />
          ))}
        </div>
        <div className="mt-8 rounded-lg border border-neutral-100">
          <Accordion
            items={[
              {
                id: "1",
                content: (
                  <div className="space-y-6 pl-1 text-sm">
                    <div>
                      <h6 className="mb-1.5 font-medium text-neutral-500">
                        Water Saved:
                      </h6>
                      <h6 className="text-neutral-400">
                        It takes{" "}
                        <span className="font-medium text-primary-500">
                          2,700 litres
                        </span>{" "}
                        to make one t-shirt.
                      </h6>
                    </div>

                    <div>
                      <h6 className="mb-1.5 font-medium text-neutral-500">
                        CO<sub>2</sub> Saved:
                      </h6>
                      <h6 className="text-neutral-400">
                        On average,{" "}
                        <span className="font-medium text-primary-500">
                          7.9kg of CO<sub>2</sub>
                        </span>{" "}
                        is saved by buying a secondhand item over a new one.
                      </h6>
                    </div>

                    <div>
                      <h6 className="mb-1.5 font-medium text-neutral-500">
                        Energy Saved:
                      </h6>
                      <h6 className="text-neutral-400">
                        Based on average energy consumption in textile
                        production and transportation.
                      </h6>
                    </div>
                  </div>
                ),
                title: "How we got these calculations",
              },
            ]}
            noBorders
          />
        </div>
      </div>
      <TrustBadges />
    </div>
  );
};

const breadcrumbs: BreadcrumbTypes[] = [
  {
    label: "Home",
    href: ROUTES.SHOP,
  },
  {
    label: "Account",
    href: ROUTES.ACCOUNT.ROOT,
  },
  {
    label: "My impact",
    href: ROUTES.ACCOUNT.MY_IMPACT,
  },
];

export default MyImpactScreen;
