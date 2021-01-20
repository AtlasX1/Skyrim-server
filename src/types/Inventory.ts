type entries = {
  baseId: number;
  count: number;
  worn?: true;
};

export type inventory = {
  entries: entries[];
};
export type inventoryEquip = {
  inv: {
    entries: {
      baseId: number;
      count: number;
      worn?: true;
      name: string;
    }[];
  };
};
