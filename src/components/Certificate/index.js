import React, { useState } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';
import Modal from 'react-modal';

// Cấu hình Modal
Modal.setAppElement('#root');

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 50,
        height: 50,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 5,
    },
    footer: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: 'auto',
        marginBottom: 20,
    },
    signContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    sign: {
        textAlign: 'center',
        fontSize: 9,
    },
});
function removeDiacritics(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
function Certificate({ name, course }) {
    return (
        <Document>
            <Page size="A5" style={styles.page}>
                <Text style={styles.title}>CERTIFICATE OF ACHIEVEMENT</Text>
                <Text style={styles.subtitle}>This is to certify that</Text>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.subtitle}>has successfully completed the course</Text>
                <Text style={styles.name}>{removeDiacritics(course)}</Text>
                <Text style={styles.footer}>Date issued: {new Date().toLocaleDateString()}</Text>
                <View style={styles.signContainer}>
                    <View style={styles.sign}>
                        <Text>____________________</Text>
                        <Text>Posts and Telecommunications Institute of Technology</Text>
                    </View>
                    <View style={styles.sign}>
                        <Text>____________________</Text>
                        <Text>Phuc Nguyen</Text>
                        <Text>Student, MultiMedia Technology</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
}

function CertificateDownload({ name, course }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <button
                onClick={openModal}
                className="fixed bottom-4 right-4 px-2 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700"
            >
                Xem Thư Chúc Mừng
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Chúc Mừng Modal"
                className="fixed inset-0 flex items-center justify-center p-4"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <div className="bg-white rounded-lg shadow-lg p-6 relative">
                    <button onClick={closeModal} className="absolute top-2 right-2 text-red-500">
                        ×
                    </button>
                    <h2 className="text-xl font-bold mb-4">Chúc mừng bạn đã hoàn thành khóa học!</h2>
                    <p className="mb-4">Bạn đã làm được một điều thật tuyệt vời! 🎉</p>
                    <p className="mb-4">
                        Các <em>Khóa Học</em> khác chuyên sâu hơn:{' '}
                        <a href="/" className="text-blue-500 underline">
                            Trang chủ
                        </a>
                    </p>
                    <hr className="my-4" />
                    <p className="mb-4">Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào, hãy liên hệ với chúng mình qua:</p>
                    <ul className="list-disc ml-5 mb-4">
                        <li>Email: xuanphuc12062002@gmail.com</li>
                        <li>Phone: 0234858787</li>
                    </ul>
                    <p>Trân trọng,</p>
                    <p>Xuân Phúc</p>
                    <PDFDownloadLink document={<Certificate name={name} course={course} />} fileName="certificate.pdf">
                        {({ loading }) => (
                            <button className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
                                {loading ? 'Đang tải...' : 'Tải Chứng Chỉ'}
                            </button>
                        )}
                    </PDFDownloadLink>
                </div>
            </Modal>
        </div>
    );
}

export default CertificateDownload;
