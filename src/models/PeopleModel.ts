export class PeopleClass {
  id: string = "";
  gender: string = "";
  name: string = "";
  isFav: boolean = false;

  getGender() {
    const characterGender = this.gender;
      switch (characterGender) {
        case "n/a":
          return "⚥ LGBTIQA+";
        case "male":
          return "♂️ Male";
        case "female":
          return "♀️ Female";
          default:
            return 'No Gender'
      }
    }
}
