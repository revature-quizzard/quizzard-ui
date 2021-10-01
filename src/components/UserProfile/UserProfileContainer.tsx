import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserProfile from "./UserProfile";

const UserProfileContainer = (props: any) => {



    return (
        <div>
          <Accordion expanded>
            <AccordionSummary
              aria-controls="panel1a-content"
              aria-label="Expand"
              id="panel1a-header"
            >
              <Typography>My Profile</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <UserProfile/>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>My Sets</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Placeholder
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography>My Favorite Sets</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Placeholder
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      );
    }

export default UserProfileContainer;