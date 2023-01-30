export default function timestamp(str){
  let today = new Date(str);
  today.setHours(today.getHours() + 9);
  return today.toISOString().replace('T', ' ').substring(0, 16);
}