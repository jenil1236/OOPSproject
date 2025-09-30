import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';

const Announcements = () => {
    // Sample announcements data
    const initialAnnouncements = [
        {
            id: 1,
            title: 'System Maintenance',
            content: 'The system will be down for maintenance on Saturday from 2 AM to 5 AM.',
            date: '2023-10-15',
            author: 'Admin Team'
        },
        {
            id: 2,
            title: 'New Feature Release',
            content: 'We are excited to announce our new dashboard features will be live next week!',
            date: '2023-10-12',
            author: 'Product Team'
        },
        {
            id: 3,
            title: 'Holiday Schedule',
            content: 'Please note the office will be closed during the upcoming holidays.',
            date: '2023-10-08',
            author: 'HR Department'
        }
    ];

    const [announcements, setAnnouncements] = useState(initialAnnouncements);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentAnnouncement, setCurrentAnnouncement] = useState({
        id: null,
        title: '',
        content: '',
        date: '',
        author: ''
    });

    // Dialog handlers
    const handleOpenDeleteDialog = (id) => {
        setDeleteId(id);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setDeleteId(null);
    };

    // Delete announcement
    const handleDelete = () => {
        setAnnouncements(announcements.filter(announcement => announcement.id !== deleteId));
        handleCloseDialog();
    };

    // Set form data for editing
    const handleEdit = (announcement) => {
        setIsEditing(true);
        setCurrentAnnouncement(announcement);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentAnnouncement({ ...currentAnnouncement, [name]: value });
    };

    // Submit form (add or edit)
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isEditing) {
            // Update existing announcement
            setAnnouncements(
                announcements.map(announcement => 
                    announcement.id === currentAnnouncement.id ? currentAnnouncement : announcement
                )
            );
            setIsEditing(false);
        } else {
            // Add new announcement
            const newAnnouncement = {
                ...currentAnnouncement,
                id: Math.max(...announcements.map(a => a.id), 0) + 1,
                date: new Date().toISOString().split('T')[0] // Current date
            };
            setAnnouncements([newAnnouncement, ...announcements]);
        }

        // Reset form
        setCurrentAnnouncement({
            id: null,
            title: '',
            content: '',
            date: '',
            author: ''
        });
    };

    return (
        <Container className="mt-4 mb-4">
            <h1 className="mb-4">Announcements</h1>
            
            {/* Admin form to add/edit announcements */}
            <Card className="mb-4">
                <Card.Body>
                    <h5 className="mb-3">
                        {isEditing ? 'Edit Announcement' : 'Create New Announcement'}
                    </h5>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Title *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={currentAnnouncement.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Author *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="author"
                                        value={currentAnnouncement.author}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Content *</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="content"
                                value={currentAnnouncement.content}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Button type="submit" variant="primary" className="me-2">
                            {isEditing ? '✏️ Update Announcement' : '➕ Post Announcement'}
                        </Button>
                        {isEditing && (
                            <Button
                                variant="outline-secondary"
                                onClick={() => {
                                    setIsEditing(false);
                                    setCurrentAnnouncement({
                                        id: null,
                                        title: '',
                                        content: '',
                                        date: '',
                                        author: ''
                                    });
                                }}
                            >
                                Cancel
                            </Button>
                        )}
                    </Form>
                </Card.Body>
            </Card>

            {/* List of announcements */}
            <h5 className="mb-3">All Announcements</h5>
            
            {announcements.length > 0 ? (
                announcements.map((announcement) => (
                    <Card key={announcement.id} className="mb-3">
                        <Card.Body>
                            <Card.Title>{announcement.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                Posted on {announcement.date} by {announcement.author}
                            </Card.Subtitle>
                            <Card.Text>
                                {announcement.content}
                            </Card.Text>
                            <Button
                                variant="outline-primary"
                                size="sm"
                                className="me-2"
                                onClick={() => handleEdit(announcement)}
                            >
                                ✏️ Edit
                            </Button>
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleOpenDeleteDialog(announcement.id)}
                            >
                                🗑️ Delete
                            </Button>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <p>No announcements available.</p>
            )}

            {/* Confirmation Modal for Delete */}
            <Modal show={openDialog} onHide={handleCloseDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this announcement? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDialog}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Announcements;