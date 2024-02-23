export const  isLeetCodeLink=(link:string)=> {
  // Check if the link starts with "https://leetcode.com" or "http://leetcode.com"
  return (
    link.startsWith("https://leetcode.com") ||
    link.startsWith("http://leetcode.com")
  );
}
