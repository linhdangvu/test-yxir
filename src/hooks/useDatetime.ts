export const useDatetime = () => {
  const months = [
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre",
  ];

  const convertFirebaseDate = (data: any) => {
    const date = new Date(data.seconds * 1000 + data.nanoseconds / 1000000);
    return date
      .toISOString()
      .replace("T", " ")
      .replace(/\.\d+Z$/, "");
  };

  const getMonthIndex = (month: string) => {
    switch (month) {
      case "Fevrier":
        return 1;
      case "Mars":
        return 2;
      case "Avril":
        return 3;
      case "Mai":
        return 4;
      case "Juin":
        return 5;
      case "Juillet":
        return 6;
      case "Aout":
        return 7;
      case "Septembre":
        return 8;
      case "Octobre":
        return 9;
      case "Novembre":
        return 10;
      case "Decembre":
        return 11;
      default:
        return 0;
    }
  };

  return { getMonthIndex, months, convertFirebaseDate };
};
