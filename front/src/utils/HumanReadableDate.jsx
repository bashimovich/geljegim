function HumanReadableDate({date}) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; 
    const day = dateObj.getDate();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const formattedDate = `${day}.${month}.${year} - ${hours}:${minutes}`;

  return <>{formattedDate}</>;
}

export default HumanReadableDate