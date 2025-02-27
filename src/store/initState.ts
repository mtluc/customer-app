
async function fetchData() {
  return 10;
}

export const initState = async (
  pr?: Promise<Partial<any>>
): Promise<Partial<any>> => {
  const [counter, otherData] = await Promise.all([fetchData(), pr]);
  return {
    counter: { value: counter },
    ...(otherData ?? {}),
  };
};
