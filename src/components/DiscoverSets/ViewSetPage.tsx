import {useSelector} from "react-redux";
import {authState} from "../../state-slices/auth/auth-slice";
import {StudySetState} from "../../state-slices/sets/create-study-sets-slice";
import { Set } from "../../dtos/Set"


function ViewSetPage(){

    const s: Set = useSelector(StudySetState).aSet;


    return(
        <>

            <div>{s.setName}</div>
            <div>{s.author}</div>
            <div>{s.views}</div>
            <div>{s.cards} </div>
            <div>{s.tags.map((tag,index, s) =>( <h6 key={index}>{tag.tagName} </h6>   ))}</div>
            <div>{s.favorites}</div>

        </>
    )
}

export default ViewSetPage;