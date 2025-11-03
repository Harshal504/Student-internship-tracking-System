import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

export function AboutUs() {
    const people = [
        {
            name: 'Rahul Sharma',
            image: 'https://www.wallofcelebrities.com/celebrity/barack-obama/pictures/xxlarge/barack-obama_442397.jpg', // Replace with actual image
            description:
                'Rahul is a passionate full-stack developer focused on building practical web applications with clean UI/UX and robust backend logic. He created this internship tracker portal to help students streamline their internship journey.',
            github: 'https://github.com/rahulsharma-dev',
        },
        {
            name: 'Sneha Verma',
            image: 'https://tse2.mm.bing.net/th/id/OIP.dfhDPANaHarH0sv3cAmvfgHaNK?rs=1&pid=ImgDetMain&o=7&rm=3', // Replace with actual image
            description:
                'Sneha is a creative frontend developer who specializes in responsive design and accessibility. She contributed to the UI components and styling of the internship tracker portal.',
            github: 'https://github.com/snehaverma-ui',
        },
                {
            name: 'Rohit Sharma',
            image: 'https://admin.thecricketer.com/weblab/Sites/96c8b790-b593-bfda-0ba4-ecd3a9fdefc2/resources/images/site/sharmaheadshot-min.jpg', // Replace with actual image
            description:
                'Rohit Sharma is a celebrated Indian cricketer known for his elegant batting and leadership. He currently captains the Indian national team and the Mumbai Indians in the IPL.',
            github: 'https://github.com/snehaverma-ui',
        }
    ];

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4">About the Developers</h2>
            {people.map((person, index) => (
                <Row
                    key={index}
                    className="border rounded p-3 shadow-sm align-items-center mb-4"
                    style={{ borderWidth: '5px', borderStyle: 'solid' }}
                >
                    <Col md={4} className="text-center mb-3 mb-md-0">
                        <Image
                            src={person.image}
                            alt={person.name}
                            rounded
                            style={{
                                width: '150px',
                                height: '180px',
                                objectFit: 'cover',
                                border: '1px solid #ccc',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                            }}
                        />

                    </Col>
                    <Col md={8}>
                        <h4>{person.name}</h4>
                        <p>{person.description}</p>
                        <Button
                            variant="dark"
                            href={person.github}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Visit GitHub
                        </Button>
                    </Col>
                </Row>
            ))}
        </Container>
    );
}
