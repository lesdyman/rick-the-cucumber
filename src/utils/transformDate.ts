export const getTransformedDate = (dateToTransform: string) => {

 const newDate = new Date(dateToTransform);

  const day = newDate.getUTCDate();
  const month = newDate.toLocaleDateString("en-US", {
    month: "long",
    timeZone: "UTC",
  });

  const year = newDate.getUTCFullYear();
  const time = newDate.toISOString().split("T")[1].replace("Z", "UTC");

  return `${day} ${month} ${year} at ${time}`;
};