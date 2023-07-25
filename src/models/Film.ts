export class FilmClass {
  id: string = "";
  title: string = "";
  director: string = "";
  releaseDate: string = "";
  isFav?: boolean = false;

  getTitleNameWithYear() {
    const releaseYear = this.releaseDate.split("-")[0];
    return `${this.title} (${releaseYear})`;
  }

  getDateFormat() {
    const [year, month, day] = this.releaseDate.split("-");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthName = monthNames[+month - 1];
    const formattedDate = `${day} ${monthName} ${year}`;
    return formattedDate
  }
}
