export type MenuItem = {
  title: string;
} & (
  | {
      isParent: false;
      link: string;
    }
  | {
      isParent: true;
      subItems: MenuItem[];
    }
);

export type HeaderType = MenuItem[];
