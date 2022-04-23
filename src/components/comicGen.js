import { useState, useEffect } from 'react';
import Image from "material-ui-image";
import { Box } from "@mui/material";

export default function ComicGen() {

    const [avatarOptions, setAvatarOptions] = useState({
        name: "aavatar",
        gender: "female",
        character: "bindi",
        facestyle: "sketchy",
        emotion: "afraid",
        attire: "bodycon",
        pose: "handsonhip",
        face: "#eeddc5",
        shirt: "#ffcc66",
        pant: "#3a4e5c",
        box: "",
        boxcolor: "#000000",
        boxgap: "",
        mirror: ""
    });

    const [avatarURL, setAvatarURL] = useState(
        "https://gramener.com/comicgen/v1/comic?name=aavatar&gender=female&character=bindi&facestyle=sketchy&emotion=afraid&attire=bodycon&pose=handonhip&face=%23eeddc5&shirt=%23ffcc66&pant=%233a4e5c&box=&boxcolor=%23000000&boxgap=&mirror="
    );

    useEffect(() => {
        console.log("NEW STATE: ", avatarOptions);
        console.log(avatarURL);
    }, [avatarURL]);

    //add current character to current comic panel
    const handleSubmit = () => {
        console.log("HANDLING SUBMIT");
    }

    //give user update in the cahracter they can add
    const handleChange = async (e) => {
        const value = e.target.value;
        setAvatarOptions({ ...avatarOptions, [e.target.name]: value },
            setAvatarURL(`https://gramener.com/comicgen/v1/comic?name=${avatarOptions.name}&gender=${avatarOptions.gender}&character=${avatarOptions.character}&facestyle=${avatarOptions.facestyle}&emotion=${avatarOptions.emotion}&attire=${avatarOptions.attire}&pose=${avatarOptions.pose}&face=%23${avatarOptions.face.slice(1)}&shirt=%23${avatarOptions.shirt.slice(1)}&pant=%23${avatarOptions.pant.slice(1)}&box=${avatarOptions.box}&boxcolor=%23${avatarOptions.boxcolor.slice(1)}&boxgap=${avatarOptions.boxgap}&mirror=${avatarOptions.mirror}`)
        );
    };

    return (
        <div>
            <form className="selector form-inline" onSubmit={handleSubmit}>
                <div id="menu">

                    <div className="param pe-2 mb-2 text-center">
                        <label htmlFor="name">name</label>
                        <select className="form-select" id="name" name="name" defaultValue="aavatar" onChange={handleChange}>
                            <option>aavatar</option>
                            <option>aryan</option>
                            <option>ava</option>
                            <option>bean</option>
                            <option>biden</option>
                            <option>bill</option>
                            <option>dee</option>
                            <option>deenuova</option>
                            <option>dey</option>
                            <option>deynuovo</option>
                            <option>ethan</option>
                            <option>evan</option>
                            <option>facesketch</option>
                            <option>fxemoji</option>
                            <option>guage</option>
                            <option>humaaans</option>
                            <option>noto</option>
                            <option>priya</option>
                            <option>priyanuova</option>
                            <option>ringo</option>
                            <option>ringonuovo</option>
                            <option>smiley</option>
                            <option>sophie</option>
                            <option>speechbubble</option>
                            <option>trump</option>
                        </select>
                    </div>

                    <div className="param pe-2 mb-2 text-center">
                        <label htmlFor="gender">gender</label>
                        <select className="form-select" id="gender" name="gender" defaultValue="female" onChange={handleChange}>
                            <option>female</option>
                            <option>male</option>
                            <option>unisex</option>
                        </select>
                    </div>

                    <div className="param pe-2 mb-2 text-center">
                        <label htmlFor="character">character</label>
                        <select className="form-select" id="character" name="character" defaultValue="bindi" onChange={handleChange}>
                            <option>bindi</option>
                            <option>blondecurly</option>
                            <option>blondeshort</option>
                            <option>densehair</option>
                            <option>densehairwithband</option>
                            <option>hairband</option>
                            <option>highbun</option>
                            <option>messyponytail</option>
                            <option>oldladywithglasses</option>
                            <option>shorthair</option>
                            <option>wavy</option>
                        </select>
                    </div>

                    <div className="param pe-2 mb-2 text-center">
                        <label htmlFor="facestyle">facestyle</label>
                        <select className="form-select" id="facestyle" name="facestyle" defaultValue="sketchy" onChange={handleChange}>
                            <option>sketchy</option>
                            <option>strokes</option>
                            <option>thinlines</option>
                        </select>
                    </div>

                    <div className="param pe-2 mb-2 text-center">
                        <label htmlFor="emotion">emotion</label>
                        <select className="form-select" id="emotion" name="emotion" defaultValue="afraid" onChange={handleChange}>
                            <option>afraid</option>
                            <option>angry</option>
                            <option>annoyed</option>
                            <option>blush</option>
                            <option>confused</option>
                            <option>cry</option>
                            <option>cryingloudly</option>
                            <option>cunning</option>
                            <option>curious</option>
                            <option>disappointed</option>
                            <option>dozing</option>
                            <option>drunk</option>
                            <option>excited</option>
                            <option>happy</option>
                            <option>hearteyes</option>
                            <option>irritated</option>
                            <option>lookingdown</option>
                            <option>lookingleft</option>
                            <option>lookingright</option>
                            <option>lookingup</option>
                            <option>mask</option>
                            <option>neutral</option>
                            <option>nevermind</option>
                            <option>ooh</option>
                            <option>rofl</option>
                            <option>rollingeyes</option>
                            <option>sad</option>
                            <option>scared</option>
                            <option>shocked</option>
                            <option>shout</option>
                            <option>smile</option>
                            <option>smirk</option>
                            <option>starstruck</option>
                            <option>surprised</option>
                            <option>tired</option>
                            <option>tongueout</option>
                            <option>whistle</option>
                            <option>wink</option>
                            <option>worried</option>
                        </select>
                    </div>

                    <div className="param pe-2 mb-2 text-center">
                        <label htmlFor="attire">attire</label>
                        <select className="form-select" id="attire" name="attire" defaultValue="bodycon" onChange={handleChange}>
                            <option>bodycon</option>
                            <option>casualfullsleevetee</option>
                            <option>casualtee</option>
                            <option>formal</option>
                            <option>formalsuit</option>
                            <option>fullsleeveshirt</option>
                            <option>saree</option>
                            <option>stickfigure</option>
                            <option>tuckedinshirt</option>
                            <option>uniform</option>
                        </select>
                    </div>

                    <div className="param pe-2 mb-2 text-center">
                        <label htmlFor="pose">pose</label>
                        <select className="form-select" id="pose" name="pose" defaultValue="handonhip" onChange={handleChange}>
                            <option>handonhip</option>
                            <option>handsfolded</option>
                            <option>handsonhip</option>
                            <option>holdingbag</option>
                            <option>holdinglaptop</option>
                            <option>pointingleft</option>
                            <option>shy</option>
                            <option>sittingonbeanbag</option>
                            <option>super</option>
                            <option>walk</option>
                            <option>wonderwoman</option>
                        </select>
                    </div>

                    <div className="param pe-2 mb-2 text-center">
                        <label htmlFor="face">face</label>
                        <input type="color" value="#eeddc5" id="face" name="face" className="form-control form-control-color" onChange={handleChange} />
                    </div>

                    <div className="param pe-2 mb-2 text-center">
                        <label htmlFor="shirt">shirt</label>
                        <input type="color" value="#ffcc66" id="shirt" name="shirt" className="form-control form-control-color" onChange={handleChange} />
                    </div>

                    <div className="param pe-2 mb-2 text-center">
                        <label htmlFor="pant">pant</label>
                        <input type="color" value="#3a4e5c" id="pant" name="pant" className="form-control form-control-color" onChange={handleChange} />
                    </div>

                    <div className="param pe-2 mb-2 text-center">
                        <label htmlFor="box">box</label>
                        <select className="form-select" id="box" name="box" defaultValue="" onChange={handleChange}>
                            <option></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="5">5</option>
                            <option value="7">7</option>
                            <option value="10">10</option>
                        </select>
                    </div>

                    <div className="param pe-2 mb-2 text-center">
                        <label htmlFor="boxcolor">boxcolor</label>
                        <input name="boxcolor" id="boxcolor" type="color" value="#000000" className="form-control form-control-color" onChange={handleChange} />
                    </div>

                    <div className="param pe-2 mb-2 text-center">
                        <label htmlFor="boxgap">boxgap</label>
                        <input name="boxgap" id="boxgap" type="number" min="0" value="" className="form-control form-control-number" onInput={handleChange} />
                    </div>

                    <div className="param pe-2 mb-2 text-center">
                        <label htmlFor="mirror">mirror</label>
                        <select className="form-select" id="mirror" name="mirror" defaultValue="" onChange={handleChange} >
                            <option></option>
                            <option value="mirror">mirror</option>
                        </select>
                    </div>
                    <Box sx={{width: '100px'}}>
                    <img src={avatarURL}/>
                    </Box>

                    <input type="button" value="Add to Comic" onClick={handleSubmit} />
                </div>
            </form>


        </div>
    )
};