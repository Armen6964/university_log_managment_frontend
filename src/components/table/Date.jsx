import moment from "moment";

export default function TableDate({ date }) {
    let d = moment(date);
    return d.isValid() ? d.format("YYYY-MM-DD") : "";
}
