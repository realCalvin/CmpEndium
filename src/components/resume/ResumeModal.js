import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Modal, List, Typography, Input, Button, Divider } from 'antd';
import { Document, Page, pdfjs } from 'react-pdf';
import { saveResumeComment } from '../../api/Resume';
import { currentEmail } from '../../api/Auth';
import { UserInfo } from '../../api/UserInfo';
import './ResumeModal.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function ResumeModal(props) {
    const [comment, setComment] = useState('');
    const resume = props.currentResume;
    const data = props.currentResume.comments;

    function handleComment(e) {
        setComment(e.target.value);
    }

    async function handleSubmitComment() {
        const userInfo = await UserInfo(currentEmail());
        const resumeComment = {
            _id: resume._id,
            username: userInfo.data.username,
            comment: comment
        };
        saveResumeComment(resumeComment);

        // dynamically update on client-side
        data.push({
            username: userInfo.data.username,
            comment: comment
        });
        setComment('');
    }

    function handleCancel() {
        props.setShowModal(false);
    }

    return (
        <div className="ResumeModal">
            <Modal
                title={resume.major}
                width={1200}
                style={{ top: 20 }}
                visible={props.showModal}
                onCancel={handleCancel}
                footer={null}
            >
                <Row>
                    <Col lg={8}>
                        <Document
                            file={resume.link}
                            loading="Loading..."
                        >
                            <Page renderTextLayer={false} pageNumber={1}/>
                        </Document>
                    </Col>
                    <Col className="comment-section-container">
                        <div>
                            <Divider orientation="center">Comments</Divider>
                            <List
                                className="comment-section-list"
                                bordered
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item>
                                        <Typography.Text code>{item.username}</Typography.Text> {item.comment}
                                    </List.Item>
                                )}
                            />
                            <div className="comment-section-footer">
                                <Input.TextArea
                                    onChange={handleComment}
                                    rows={4}
                                    value={comment}
                                    placeholder="Provide resume feedback here"
                                />
                                <Button onClick={handleSubmitComment}>Submit</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Modal>
        </div>
    );
}

export default ResumeModal;
