import {Modal} from '@material-ui/core';

/*
    Redux Props:
        + user
        + gameSettings {
            - name
            - set
            - capacity
            - timer
        }
 */

// Props necessary for managing a modal
interface IGameSettings {
    show: boolean;
    setShow: (val: boolean) => void
}

/**
 *  This modal is used to set game settings with which to start a game, when the user clicks
 *  'Create Game' in Game.tsx.
 *  Users will be able to set:
 *      + Game Name
 *      + Game Set
 *      + Game Capacity
 *      + Game Timer
 *  with some validation on each field.
 * 
 *  Games will not be able to be created if not all of these fields are set and valid.
 * 
 * @author Sean Dunn, Colby Wall, Heather Guilfoyle
 */
function GameSettings(props: IGameSettings) {

    const handleClose = () => {

    }

    return (
        <>
            {/* <Modal>
                // When each of these fields change, update their info in Redux
                <Input>Enter Game Name</Input>
                <Table>
                    sets.map() <Button> Select This Set </Button>
                </Table>
                <Input>Enter Game Capacity</Input>
                <Input>Enter Game Timer</Input>
            </Modal> */}
        </>
    );
}


export default GameSettings;