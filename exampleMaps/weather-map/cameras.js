var locations = [
        {
            name: "Look Rock",
            properties: {
                camActive:true,
                camCoords:[35.633424, -83.941254],
                camURL:"https://www.outragegis.com/weather/img/LookRock-400.jpg",
                camHiRes:"https://www.outragegis.com/weather/img/LookRock.jpg",
                camInfo:"East",
                camElev: 2628,
                typeLocation:"Mountain",
                typeIconURL:"svgs/mountain-15.svg",
            }
        },
        {
            name: "Purchase Knob",
            properties: {
                camActive:true,
                camCoords:[35.585966, -83.072944],
                camURL:"https://www.outragegis.com/weather/img/PurchaseKnob-400.jpg",
                camHiRes:"https://www.outragegis.com/weather/img/PurchaseKnob.jpg",
                camInfo:"East",
                camElev: 5085,
                typeLocation:"Mountain",
                typeIconURL:"svgs/mountain-15.svg",
            }
        },
        {
            name: "Cold Mountain",
            properties: {
                camActive:true,
                camCoords:[35.393713, -82.774422],
                camURL:"https://www.outragegis.com/weather/img/ColdMountain-400.jpg",
                camHiRes:"https://www.outragegis.com/weather/img/ColdMountain.jpg",
                camInfo:"West",
                camElev: 4922,
                typeLocation:"Mountain",
                typeIconURL:"svgs/mountain-15.svg",
            }
        },
        {
            name: "New Found Gap",
            properties: {
                camActive:true,
                camCoords:[35.611073, -83.424583],
                camURL:"https://www.outragegis.com/weather/img/NewGap-400.jpg",
                camHiRes:"https://www.outragegis.com/weather/img/NewGap.jpg",
                camInfo:"Southeast",
                camElev: 5046,
                typeLocation:"Mountain",
                typeIconURL:"svgs/mountain-15.svg",
            }
        },
        {
            name: "Joyce Kilmer",
            properties: {
                camActive:true,
                camCoords:[35.257497, -83.795160],
                camURL:"https://www.outragegis.com/weather/img/JoyceKilmer-400.jpg",
                camHiRes:"https://www.outragegis.com/weather/img/JoyceKilmer.html",
                camInfo:"West",
                camElev: 4801,
                typeLocation:"Park",
                typeIconURL:"svgs/mountain-15.svg",
            }
        },
        {
            name: "Clingmans Dome",
            properties: {
                camActive:true,
                camCoords:[35.562709, -83.498421],
                camURL:"https://phenocam.sr.unh.edu/data/latest/thumbs/smokydome.thumb.jpg",
                camHiRes:"https://phenocam.sr.unh.edu/data/latest/smokydome.jpg",
                camInfo:"North",
                camElev: 6644,
                typeLocation:"Landmark",
                typeIconURL:"svgs/landmark-15.svg",
            }
        },
        {
            name: "Mammoth Cave",
            properties: {
                camActive:true,
                camCoords:[37.192755, -86.102055],
                camURL:"https://phenocam.sr.unh.edu/data/latest/thumbs/mammothcave.thumb.jpg",
                camHiRes:"https://www.outragegis.com/weather/img/MaCa.jpg",
                camInfo:"North",
                camElev: 741,
                typeLocation:"Landmark",
                typeIconURL:"svgs/landmark-15.svg",
            }
        },
        {
            name: "Jackson",
            properties: {
                camActive:true,
                camCoords:[37.592006, -83.316127],
                camURL:"https://www.outragegis.com/weather/img/DBoone-400.jpg",
                camHiRes:"https://www.outragegis.com/weather/img/DBoone-Lg.jpg",
                camInfo:"South",
                camElev: 1400,
                typeLocation:"Park",
                typeIconURL:"svgs/park-15.svg",
            }
        },
        {
            name: "Robinson Forest",
            properties: {
                camActive:true,
                camCoords:[37.467008, -83.157612],
                camURL:"https://phenocam.sr.unh.edu/data/latest/thumbs/robinson2.thumb.jpg",
                camHiRes:"https://phenocam.sr.unh.edu/data/latest/robinson2.jpg",
                camInfo:"West",
                camElev: 1585,
                typeLocation:"Park",
                typeIconURL:"svgs/park-15.svg",
            }
        },

];

/*
var camName =   ["Look Rock",
                "Purchase Knob", 
                "Cold Mountain", 
                "New Found Gap", 
                "Joyce Kilmer",
                "Clingmans Dome",
                "Mammoth Cave", 
                "Jackson",
                "Robinson Forest"],
    camActive = [true, true, true, true, true, true, true, true, true],
    camCoords = [[35.633424, -83.941254],
                [35.585966, -83.072944],
                [35.393713, -82.774422],
                [35.611073, -83.424583],
                [35.257497, -83.795160],
                [35.562709, -83.498421],
                [37.192755, -86.102055],
                [37.592006, -83.316127],
                [37.467008, -83.157612]],
    camURL =    ["https://www.outragegis.com/weather/img/LookRock-400.jpg",
                "https://www.outragegis.com/weather/img/PurchaseKnob-400.jpg",
                "https://www.outragegis.com/weather/img/ColdMountain-400.jpg",
                "https://www.outragegis.com/weather/img/NewGap-400.jpg",
                "https://www.outragegis.com/weather/img/JoyceKilmer-400.jpg",
                "https://phenocam.sr.unh.edu/data/latest/thumbs/smokydome.thumb.jpg",
                "https://phenocam.sr.unh.edu/data/latest/thumbs/mammothcave.thumb.jpg",
                "https://www.outragegis.com/weather/img/DBoone-400.jpg",
                "https://phenocam.sr.unh.edu/data/latest/thumbs/robinson2.thumb.jpg"],
    camHiRes =  ["https://www.outragegis.com/weather/img/LookRock.jpg",
                 "https://www.outragegis.com/weather/img/PurchaseKnob.jpg",
                 "https://www.outragegis.com/weather/img/ColdMountain.jpg",
                 "https://www.outragegis.com/weather/img/NewGap.jpg",
                 "http://www.outragegis.com/weather/img/JoyceKilmer.html",
                 "https://phenocam.sr.unh.edu/data/latest/smokydome.jpg",
                 "https://www.outragegis.com/weather/img/MaCa.jpg",
                 "https://www.outragegis.com/weather/img/DBoone-Lg.jpg",
                 "https://phenocam.sr.unh.edu/data/latest/robinson2.jpg"]
    camInfo =   ["East", "East", "West", "Southeast", "West", "North", "North", "South", "West"],
    camElev =   [2628, 5085, 4922, 5046, 4801, 6644, 741, 1400, 1585];
    typeLocation = ["Mountain","Mountain","Mountain","Mountain","Park","Landmark","Landmark","Park","Park"];
    typeIconURL = ["svgs/mountain-15.svg","svgs/park-15.svg","svgs/landmark-15.svg"];
*/
