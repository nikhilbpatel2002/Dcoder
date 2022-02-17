
const list = [["All", "all"],
["CodeForces", "codeforces", "https://codeforces.com"],
["TopCoder", "top_coder", "https://topcoder.com"], 
["AtCoder", "at_coder", "https://atcoder.jp"], 
 ["CodeChef", "code_chef", "https://codechef.com"],
  ["HackerRank", "hacker_rank", "https://hackerrank.com"], 
  ["HackerEarth", "hacker_earth", "https://hackerearth.com"], 
  ["Kick Start", "kick_start", "https://codingcompetitions.withgoogle.com/kickstart"],
   ["LeetCode", "leet_code", "https://leetcode.com"]]

const sites = {
    CodeForces: { name: "CodeForces", imageurl: "/siteimage/codeforces.png", url: "https://codeforces.com", apiSuffix: "codeforces" },
    CodeForcesGym: { name: "CodeForces::Gym", imageurl: "/siteimage/codeforces.png", url: "https://codeforces.com/gyms", apiSuffix: "codeforces_gym" },
    TopCoder: { name: "TopCoder", imageurl: "/siteimage/top_coder.png", url: "https://topcoder.com", apiSuffix: "top_coder" },
    AtCoder: { name: "AtCoder", imageurl: "/siteimage/at_coder.png", url: "https://atcoder.jp", apiSuffix: "at_coder" },
    CSAcademy: { name: "CS Academy", imageurl: "/siteimage/cs_academy.png", url: "https://csacademy.com", apiSuffix: "cs_academy" },
    CodeChef: { name: "CodeChef", imageurl: "/siteimage/code_chef.png", url: "https://codechef.com", apiSuffix: "code_chef" },
    HackerRank: { name: "HackerRank", imageurl: "/siteimage/hacker_rank.png", url: "https://hackerrank.com", apiSuffix: "hacker_rank" },
    HackerEarth: { name: "HackerEarth", imageurl: "/siteimage/hacker_earth.png", url: "https://hackerearth.com", apiSuffix: "hacker_earth" },
    KickStart: { name: "Kick Start", imageurl: "/siteimage/kick_start.png", url: "https://codingcompetitions.withgoogle.com/kickstart", apiSuffix: "kick_start" },
    LeetCode: { name: "LeetCode", imageurl: "/siteimage/leet_code.png", url: "https://leetcode.com", apiSuffix: "leet_code" }
    // Toph:{name: "Toph",imageurl:"/siteimage/toph.png",url:"https://toph.co",apiSuffix:""},
}

function getImageUrl(siteName) {
    if (siteName == "CodeForces") {
        return sites.CodeForces.imageurl;
    }
    else if (siteName == "CodeForces::Gym") {
        return sites.CodeForcesGym.imageurl;
    }
    else if (siteName == "TopCoder") {
        return sites.TopCoder.imageurl;
    }
    else if (siteName == "AtCoder") {
        return sites.AtCoder.imageurl;
    }
    else if (siteName == "CS Academy") {
        return sites.CSAcademy.imageurl;
    }
    else if (siteName == "CodeChef") {
        return sites.CodeChef.imageurl;
    }
    else if (siteName == "HackerRank") {
        return sites.HackerRank.imageurl;
    }
    else if (siteName == "HackerEarth") {
        return sites.HackerEarth.imageurl;
    }
    else if (siteName == "Kick Start") {
        return sites.KickStart.imageurl;
    }
    else if (siteName == "LeetCode") {
        return sites.LeetCode.imageurl;
    }
    else if (siteName == "Toph") {
        return sites.Toph.imageurl;
    }
}
function getSiteUrl(siteName) {
    if (siteName == "CodeForces") {
        return sites.CodeForces.url;
    }
    else if (siteName == "CodeForces::Gym") {
        return sites.CodeForcesGym.url;
    }
    else if (siteName == "TopCoder") {
        return sites.TopCoder.url;
    }
    else if (siteName == "AtCoder") {
        return sites.AtCoder.url;
    }
    else if (siteName == "CS Academy") {
        return sites.CSAcademy.url;
    }
    else if (siteName == "CodeChef") {
        return sites.CodeChef.url;
    }
    else if (siteName == "HackerRank") {
        return sites.HackerRank.url;
    }
    else if (siteName == "HackerEarth") {
        return sites.HackerEarth.url;
    }
    else if (siteName == "Kick Start") {
        return sites.KickStart.url;
    }
    else if (siteName == "LeetCode") {
        return sites.LeetCode.url;
    }
    else if (siteName == "Toph") {
        return sites.Toph.url;
    }
}

function getsite() {
    return sites
}
export { getImageUrl, getSiteUrl, getsite, sites, list };