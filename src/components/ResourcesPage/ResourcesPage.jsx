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
                            <Link href='https://landback.org/'>Landback</Link>
                        </Typography>
                        <Typography>
                            <Link href='https://makoceikikcupi.com/'>Makoce Ikikcupi - A project of reparative justice </Link>
                        </Typography>
                        <Typography>
                            <Link href='https://sahanjournal.com/news-partners/st-paul-commission-tackles-reparations-for-descendants-enslaved-people/'>
                                St. Paul commission tackles reparations for descendants of enslaved people</Link>
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
                            <Link href='https://sisterscamelot.org/'>Sister's Camelot</Link>
                        </Typography>
                        <Typography>
                        <Link href='https://www.canmn.org/'>Community Aid Network MN</Link>   
                        </Typography>
                        <Typography>
                        <Link href='https://sourcemn.org/food/'>Source, MN</Link>  
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
                        <Link href='https://www.facebook.com/TwinCitiesReallyReallyFreeMarket/'>Twin Cities Really Really Free Market</Link>
                        </Typography>
                        <Typography>
                        <Link href='https://www.facebook.com/groups/1119973885030620/'>Buy Nothing Facebook Group</Link> 
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
                            <Link href='https://dakotawicohan.org/wp-content/uploads/2017/03/L1-Mni-Sota-Makoce.pdf'>Dakota Wicohan - Dakota language lessons</Link>
                        </Typography>
                        <Typography>
                        <Link href='https://m4bl.org/wp-content/uploads/2020/05/CulturalReparations-OnePager.pdf'>Cultural Reparations - A Vision for Black Lives</Link>
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
                            <Link href='https://mylegalaid.org/'>MN Legal Aid</Link>
                        </Typography>
                        <Typography>
                        <Link href='https://www.lawhelpmn.org/'>Law Help MN</Link>
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
                            <Link href='https://www.creativesaftercurfew.com/our-story'>Creatives After Curfew</Link>
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
                            <Link href='https://www.familytreeclinic.org/'>Family Tree Clinic</Link>
                        </Typography>
                    </AccordionDetails>
                </Accordion>             


            </div>

        </div>

    )
}

export default ResourcesPage;