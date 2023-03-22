import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from '@mui/material/Link'

import './ResourcesPage.css';


function ResourcesPage() {

    return (
        <div className='container'>
            <h2>Resources</h2>

            <div className='list'>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Financial Solidarity</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <Link href='https://ysnmn.org/Shelters'>Emergency shelter bed availability for youth</Link>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Housing</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <Link href='https://ysnmn.org/Shelters'>Emergency shelter bed availability for youth</Link>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Food Justice</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <Link href='https://ysnmn.org/Shelters'>Emergency shelter bed availability for youth</Link>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Free Stuff</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <Link href='https://ysnmn.org/Shelters'>Emergency shelter bed availability for youth</Link>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Education</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <Link href='https://ysnmn.org/Shelters'>Emergency shelter bed availability for youth</Link>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Legal</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <Link href='https://ysnmn.org/Shelters'>Emergency shelter bed availability for youth</Link>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Childcare</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <Link href='https://ysnmn.org/Shelters'>Emergency shelter bed availability for youth</Link>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Creativity</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <Link href='https://ysnmn.org/Shelters'>Emergency shelter bed availability for youth</Link>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Healthcare</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <Link href='https://ysnmn.org/Shelters'>Emergency shelter bed availability for youth</Link>
                        </Typography>
                    </AccordionDetails>
                </Accordion>


            </div>

        </div>

    )
}

export default ResourcesPage;