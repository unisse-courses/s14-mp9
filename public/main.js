//https://teamtreehouse.com/library/create-an-array-of-objects
//https://answers.unity.com/questions/637902/how-to-use-javascript-array-with-classes.html



var users = [
    {
        idNo: "11610514",
        password: "513",
        fullName: "Jessamyn Kristi Lapan",
        degree: "BS-CS",
        email: "jessamyn_lapan@dlsu.edu.ph",
        mobileNo: "2213784653"
    },
    {
        idNo: "11610003",
        password: "sleepy",
        fullName: "Santiago Yoshiki Hernandez",
        degree: "BS-IT",
        email: "santiago_hernandez@dlsu.edu.ph",
        mobileNo: "3049587763464"
    },
    {
        idNo: "11739937",
        password: "yup",
        fullName: "Roland Jaime Orzabal de la Quintana",
        degree: "BS-Psy",
        email: "roland_orzbal@dlsu.edu.ph",
        mobileNo: "12223213743976"
    },
    {
        idNo: "11733139",
        password: "867",
        fullName: "Curt Smith",
        degree: "BEED-ECED",
        email: "curt_smith@dlsu.edu.ph",
        mobileNo: "122232149543976"
    },
    {
        idNo: "1143746",
        password: "736451",
        fullName: "Kimberly Henriette Lim",
        degree: "BS-BIO",
        email: "kimberly_lim@dlsu.edu.ph",
        mobileNo: "12397463513"
    },
    {
        idNo: "11548537",
        password: "48576",
        fullName: "Ruth Martha Estoya",
        degree: "BSE-PHYSC",
        email: "ruth_estoya@dlsu.edu.ph",
        mobileNo: "34875639344"
    },
    
    {
        idNo: "11611473",
        password: "iii",
        fullName: "Hope Katherine Tan",
        degree: "BS-CS",
        email: "hope_katherine_tan@dlsu.edu.ph",
        mobileNo: "3837496334"
    },
    {
        idNo: "11621905",
        password: "jjj",
        fullName: "Faith Gregoria Tan",
        degree: "BS-CS",
        email: "faith_gregoria_tan@dlsu.edu.ph",
        mobileNo: "34875639344"
    },
    {
        idNo: "11848257",
        password: "45jyr21",
        fullName: "Jamesina Francheska Esther Maitem",
        degree: "AB-CA",
        email: "jamesina_maitem@dlsu.edu.ph",
        mobileNo: "14568743487"
    },
    {
        idNo: "11548557",
        password: "uirye",
        fullName: "Solomon Roland Estoya",
        degree: "BSE-PHYSC",
        email: "ruth_estoya@dlsu.edu.ph",
        mobileNo: "34875639344"
    },
    {
        idNo: "11847111",
        password: "333",
        fullName: "Melchora Nina Anderson",
        degree: "AB-CA",
        email: "melchora_anderson@dlsu.edu.ph",
        mobileNo: "34875639344"
    }
];


class Locker {
    constructor(lockerNo, location, lockCode){
        this.lockerNo = lockerNo;
        this.location = location;
        this.lockCode = lockCode;
    }
}

class OwnedLocker extends Locker{
    constructor(lockerNo, location, lockCode, ownerID){
        super(lockerNo, location, lockCode);
        this.ownerID = ownerID;
    }
}

class ReservedLocker extends Locker{
    constructor(lockerNo, location, lockCode, reserveID){
        super(lockerNo, location, lockCode);
        this.reserveID = reserveID;
    }
}

/*class ReservedLocker extends Locker{
    constructor(lockerNo, location, lockCode, abandonID){
        super(lockerNo, location, lockCode);
        this.abandonID = abandonID;
    }
}*/

var lockers = [
    {
        lockerNo: "101",
        lockCode: "90485",
        location: "Br. Andrew Gonzalez Hall",
        reserved: false,
        owned: true
    },
    {
        lockerNo: "102",
        lockCode: "23456",
        location: "Br. Andrew Gonzalez Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "103",
        lockCode: "12345",
        location: "Br. Andrew Gonzalez Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "104",
        lockCode: "87941",
        location: "Br. Andrew Gonzalez Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "105",
        lockCode: "78642",
        location: "Br. Andrew Gonzalez Hall",
        reserved: false,
        owned: true
    },
    {
        lockerNo: "106",
        lockCode: "23246",
        location: "Br. Andrew Gonzalez Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "107",
        lockCode: "98631",
        location: "Br. Andrew Gonzalez Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "108",
        lockCode: "21334",
        location: "Br. Andrew Gonzalez Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "109",
        lockCode: "34297",
        location: "Br. Andrew Gonzalez Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "110",
        lockCode: "10239",
        location: "Br. Andrew Gonzalez Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "111",
        lockCode: "90485",
        location: "Br. Andrew Gonzalez Hall",
        reserved: true,
        owned: false
    },
    {
        lockerNo: "112",
        lockCode: "23456",
        location: "Br. Andrew Gonzalez Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "113",
        lockCode: "12345",
        location: "Br. Andrew Gonzalez Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "114",
        lockCode: "87941",
        location: "Br. Andrew Gonzalez Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "115",
        lockCode: "78642",
        location: "Br. Andrew Gonzalez Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "116",
        lockCode: "23246",
        location: "Br. Andrew Gonzalez Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "117",
        lockCode: "98631",
        location: "Br. Andrew Gonzalez Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "118",
        lockCode: "21334",
        location: "Br. Andrew Gonzalez Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "119",
        lockCode: "34297",
        location: "Br. Andrew Gonzalez Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "120",
        lockCode: "10239",
        location: "Br. Andrew Gonzalez Hall",
        reserved: true,
        owned: false
    },
    
    {
        lockerNo: "101",
        lockCode: "90485",
        location: "Gokongwei Hall",
        reserved: true,
        owned: false
    },
    {
        lockerNo: "102",
        lockCode: "23456",
        location: "Gokongwei Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "103",
        lockCode: "12345",
        location: "Gokongwei Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "104",
        lockCode: "87941",
        location: "Gokongwei Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "105",
        lockCode: "78642",
        location: "Gokongwei Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "106",
        lockCode: "23246",
        location: "Gokongwei Hall",
        reserved: true,
        owned: false
    },
    {
        lockerNo: "107",
        lockCode: "98631",
        location: "Gokongwei Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "108",
        lockCode: "21334",
        location: "Gokongwei Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "109",
        lockCode: "34297",
        location: "Gokongwei Hall",
        reserved: false,
        owned: true
    },
    {
        lockerNo: "110",
        lockCode: "10239",
        location: "Gokongwei Hall",
        reserved: false,
        owned: true
    },
    
    {
        lockerNo: "101",
        lockCode: "90485",
        location: "St. Joseph Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "102",
        lockCode: "23456",
        location: "St. Joseph Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "103",
        lockCode: "12345",
        location: "St. Joseph Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "104",
        lockCode: "87941",
        location: "St. Joseph Hall",
        reserved: true,
        owned: false
    },
    {
        lockerNo: "105",
        lockCode: "78642",
        location: "St. Joseph Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "106",
        lockCode: "23246",
        location: "St. Joseph Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "107",
        lockCode: "98631",
        location: "St. Joseph Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "108",
        lockCode: "21334",
        location: "St. Joseph Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "109",
        lockCode: "34297",
        location: "St. Joseph Hall",
        reserved: true,
        owned: false
    },
    {
        lockerNo: "110",
        lockCode: "10239",
        location: "St. Joseph Hall",
        reserved: false,
        owned: false
    },
    
    {
        lockerNo: "101",
        lockCode: "90485",
        location: "St. La Salle Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "102",
        lockCode: "23456",
        location: "St. La Salle Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "103",
        lockCode: "12345",
        location: "St. La Salle Hall",
        reserved: false,
        owned: true
    },
    {
        lockerNo: "104",
        lockCode: "87941",
        location: "St. La Salle Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "105",
        lockCode: "78642",
        location: "St. La Salle Hall",
        reserved: true,
        owned: false
    },
    {
        lockerNo: "106",
        lockCode: "23246",
        location: "St. La Salle Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "107",
        lockCode: "98631",
        location: "St. La Salle Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "108",
        lockCode: "21334",
        location: "St. La Salle Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "109",
        lockCode: "34297",
        location: "St. La Salle Hall",
        reserved: true,
        owned: false
    },
    {
        lockerNo: "110",
        lockCode: "10239",
        location: "St. La Salle Hall",
        reserved: false,
        owned: true
    },
    
    {
        lockerNo: "101",
        lockCode: "90485",
        location: "Enrique Razon Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "102",
        lockCode: "23456",
        location: "Enrique Razon Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "103",
        lockCode: "12345",
        location: "Enrique Razon Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "104",
        lockCode: "87941",
        location: "Enrique Razon Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "105",
        lockCode: "78642",
        location: "Enrique Razon Hall",
        reserved: false,
        owned: true
    },
    {
        lockerNo: "106",
        lockCode: "23246",
        location: "Enrique Razon Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "107",
        lockCode: "98631",
        location: "Enrique Razon Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "108",
        lockCode: "21334",
        location: "Enrique Razon Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "109",
        lockCode: "34297",
        location: "Enrique Razon Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "110",
        lockCode: "10239",
        location: "Enrique Razon Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "111",
        lockCode: "90485",
        location: "Enrique Razon Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "112",
        lockCode: "23456",
        location: "Enrique Razon Hall",
        reserved: true,
        owned: false
    },
    {
        lockerNo: "113",
        lockCode: "12345",
        location: "Enrique Razon Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "114",
        lockCode: "87941",
        location: "Enrique Razon Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "115",
        lockCode: "78642",
        location: "Enrique Razon Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "116",
        lockCode: "23246",
        location: "Enrique Razon Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "117",
        lockCode: "98631",
        location: "Enrique Razon Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "118",
        lockCode: "21334",
        location: "Enrique Razon Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "119",
        lockCode: "34297",
        location: "Enrique Razon Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "120",
        lockCode: "10239",
        location: "Enrique Razon Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "121",
        lockCode: "90485",
        location: "Enrique Razon Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "122",
        lockCode: "23456",
        location: "Enrique Razon Hall",
        reserved: false,
        owned: true
    },
    {
        lockerNo: "123",
        lockCode: "12345",
        location: "Enrique Razon Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "124",
        lockCode: "87941",
        location: "Enrique Razon Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "125",
        lockCode: "78642",
        location: "Enrique Razon Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "126",
        lockCode: "23246",
        location: "Enrique Razon Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "127",
        lockCode: "98631",
        location: "Enrique Razon Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "128",
        lockCode: "21334",
        location: "Enrique Razon Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "129",
        lockCode: "34297",
        location: "Enrique Razon Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "130",
        lockCode: "10239",
        location: "Enrique Razon Hall",
        reserved: true,
        owned: false
    },
    
    {
        lockerNo: "101",
        lockCode: "90485",
        location: "Velasco Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "102",
        lockCode: "23456",
        location: "Velasco Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "103",
        lockCode: "12345",
        location: "Velasco Hall",
        reserved: false,
        owned: true
    },
    {
        lockerNo: "104",
        lockCode: "87941",
        location: "Velasco Hall",
        reserved: true,
        owned: false
    },
    {
        lockerNo: "105",
        lockCode: "78642",
        location: "Velasco Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "106",
        lockCode: "23246",
        location: "Velasco Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "107",
        lockCode: "98631",
        location: "Velasco Hall",
        reserved: true,
        owned: false
    },
    {
        lockerNo: "108",
        lockCode: "21334",
        location: "Velasco Hall",
        reserved: false,
        owned: true
    },
    {
        lockerNo: "109",
        lockCode: "34297",
        location: "Velasco Hall",
        reserved: false,
        owned: false
    },
    {
        lockerNo: "110",
        lockCode: "10239",
        location: "Velasco Hall",
        reserved: false,
        owned: false
    }
]


var ownedLockers = [
    new OwnedLocker("101", "Br. Andrew Gonzalez Hall", "90485", "1154857"),
    new OwnedLocker("105", "Br. Andrew Gonzalez Hall", "78642", "11610003"),
    
    new OwnedLocker("109", "Gokongwei Hall", "34297", "1143746"),
    
    new OwnedLocker("103", "St. La Salle Hall", "12345", "11733139"),
    new OwnedLocker("110", "St. La Salle Hall", "10239", "11739937")
    
];

var reservedLockers = [
    new ReservedLocker("111", "Br. Andrew Gonzalez Hall", "10293", "1162190"),
    new ReservedLocker("120", "Br. Andrew Gonzalez Hall", "10293", "1161147"),
    
    new ReservedLocker("112", "Enrique Razon Hall", "90485", "11610514"),
    new ReservedLocker("130", "Enrique Razon Hall", "10239", "11848257"),
    
    new ReservedLocker("104", "Velasco Hall", "10293", "11611473"),
    new ReservedLocker("107", "Velasco Hall", "10293", "11847111")
];

class AbandonedLocker extends Locker{
    constructor(lockerNo, location, lockCode, abandonID){
        super(lockerNo, location, lockCode);
        this.abandonID = abandonID;
    }
}

var abandonLockerRequests = [
    new AbandonedLocker("110", "St. La Salle Hall", "10239", "11739937")
]

function countAllLockers(location){
    var ctr = 0;
    for(let i = 0; i < lockers.length; i++){
        if(lockers[i].location == location){
            ctr++;
        }

    }
    return ctr;
}

function countAvailableLockers(num, location){
    var ctr = num;
    for(let i = 0; i < lockers.length; i++){
        if(lockers[i].location == location){
            if(lockers[i].reserved == true){
                ctr = ctr - 1;
            }
        }
        
    }
    
    for(let i = 0; i < lockers.length; i++){
        if(lockers[i].location == location){
            if(lockers[i].owned == true){
                ctr = ctr - 1;
            }
        }
    }
    
    
    
    return ctr;
}

var locations = [
    {
        locationName: "Br. Andrew Gonzalez Hall",
        nTotalLockers: countAllLockers("Br. Andrew Gonzalez Hall"),
        availableLockers: countAvailableLockers(countAllLockers("Br. Andrew Gonzalez Hall"), "Br. Andrew Gonzalez Hall")
    },
    {
        locationName: "Gokongwei Hall",
        nTotalLockers: countAllLockers("Gokongwei Hall"),
        availableLockers: countAvailableLockers(countAllLockers("Gokongwei Hall"), "Gokongwei Hall")
    },
    {
        locationName: "St. Joseph Hall",
        nTotalLockers: countAllLockers("St. Joseph Hall"),
        availableLockers: countAvailableLockers(countAllLockers("St. Joseph Hall"), "St. Joseph Hall")
    },
    {
        locationName: "St. La Salle Hall",
        nTotalLockers: countAllLockers("St. La Salle Hall"),
        availableLockers: countAvailableLockers(countAllLockers("St. La Salle Hall"), "St. La Salle Hall")
    },
    {
        locationName: "Enrique Razon Hall",
        nTotalLockers: countAllLockers("Enrique Razon Hall"),
        availableLockers: countAvailableLockers(countAllLockers("Enrique Razon Hall"), "Enrique Razon Hall")
    },
    {
        locationName: "Velasco Hall",
        nTotalLockers: countAllLockers("Velasco Hall"),
        availableLockers: countAvailableLockers(countAllLockers("Velasco Hall"), "Velasco Hall")
    }
];

var start, end;


function term(start, end){
    var today = new Date().toDateString()
    
    if(end == today){
        ownedLockers = []
        reservedLockers = []
    }
}