import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {setStudySet} from "../../StateSlices/StudySet/studysetSlice";
import {StudySet} from "../../Models/StudySet";
import {dummyStudySetData} from "../dummyData";

const StudySetData = () => {

    useAppSelector((state => state.studySets));
    const dispatch = useAppDispatch();
    const clickHandler = (e: any) => {
        dispatch(setStudySet(dummyStudySetData[e.currentTarget.id - 1]));
    }
    return (
        <tbody>
        {dummyStudySetData.map((dataPoint: StudySet) =>
            <tr key={dataPoint.id} id={dataPoint.id.toString()} onClick={clickHandler}>
                <th scope="row" >{dataPoint.id}</th>
                <td>{dataPoint.account_id}</td>
                <td>{dataPoint.name}</td>
                <td>{dataPoint.public.toString()}</td>
            </tr>
        )}
        </tbody>
    )


};

export default StudySetData;