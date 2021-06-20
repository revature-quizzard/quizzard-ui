const StudySetData = (props: any) => {
    const dummyData =
        [
            {
                id: 1,
                topic: 'OOP',
                name: 'OOP Set',
                creator: 'Sean Taba'
            },
            {
                id: 2,
                topic: 'Java',
                name: 'Basic Java Set',
                creator: 'Jon Doe'
            },
            {
                id: 3,
                topic: 'React',
                name: 'React Set',
                creator: 'Mark Cuban'
            }
        ];
    const clickHandler = (e: any) => {
        console.log(dummyData[e.currentTarget.id]);
    }
    return (
        <tbody>
        {dummyData.map((dataPoint: any, index: any) =>
            <tr id={index} onClick={clickHandler}>
                <th scope="row" >{dataPoint.id}</th>
                <td>{dataPoint.topic}</td>
                <td>{dataPoint.name}</td>
                <td>{dataPoint.creator}</td>
            </tr>
        )}
        </tbody>
    )


};

export default StudySetData;