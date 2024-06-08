# SmartBreed


 AI-driven web application designed to accurately identify dog breeds from user-uploaded images. This comprehensive project integrates various advanced technologies and methodologies, including machine learning, deep learning, and web development frameworks, to deliver a seamless and interactive user experience.

This application is a deep learning model based on MobileNetV2, a powerful and efficient convolutional neural network optimized for speed and accuracy, making it ideal for real-time applications. 

To enrich the user experience and functionality, you've incorporated features like user registration, login functionality, and a dynamic game where users can test their knowledge by identifying dog breeds, fostering user engagement and educational value. The application also includes a statistics page that provides insightful analytics on the model's performance, including accuracy, recall, and common misclassifications, allowing users to explore the data in-depth.



**Project Overview:**

This project demonstrates an advanced integration of cloud technologies and machine learning within a web application. The core functionality allows users to upload images, which are then classified by a pre-trained machine learning model. Utilizing an active learning approach, the system continuously improves its accuracy by leveraging user feedback on predictions.

**Key Features:**

1. **Image Upload and Storage:** Users can upload images via a web interface. These images are stored in Google Cloud Storage, organized by user-provided labels, facilitating an organized dataset for model retraining.

2. **Machine Learning Model Integration:** The project incorporates a TensorFlow-based model, which classifies the uploaded images. The model, hosted on the cloud, can be accessed by the application for real-time predictions.

3. **Active Learning Cycle:** User feedback on the model's predictions is collected through the interface. This feedback informs the retraining process, enabling the model to adapt and improve over time.

4. **Cloud SQL Database:** User responses, along with the associated image metadata, are stored in a Cloud SQL database. This structured storage allows for efficient data retrieval and analysis, essential for the active learning process.

5. **Cloud SQL Proxy:** The application securely connects to the Cloud SQL database using the Cloud SQL Proxy, ensuring encrypted and authenticated database access.

6. **Automated Data Pipeline:** The project includes a data pipeline that automatically updates the training dataset in response to new user uploads and feedback, preparing the data for subsequent model retraining cycles.

**Technologies Used:**

- Flask: Serves as the web application framework.
- Google Cloud Storage: Hosts the uploaded images and organizes them based on user-provided labels.
- TensorFlow: Powers the machine learning model for image classification.
- Google Cloud SQL & Cloud SQL Proxy: Manages user data and ensures secure access to the database.
- Docker: Containerizes the application, ensuring consistency across different environments.

**How It Works:**

1. Users upload images through the web interface, which are then stored in a designated Google Cloud Storage bucket.
2. The TensorFlow model classifies the uploaded images, and the predictions are displayed to the users.
3. Users provide feedback on the accuracy of the predictions, which is stored in the Cloud SQL database.
4. The feedback is utilized to periodically retrain the model, implementing an active learning loop that enhances the model's performance over time.

**Future Enhancements:**

- Implement a more robust active learning framework to optimize the retraining cycle.
- Introduce additional features to the user interface to facilitate a more interactive feedback process.
- Expand the model's capabilities to classify a wider range of images or to improve its accuracy and efficiency.

  Deployment and scalability have been key considerations in your project. You've containerized the application using Docker, facilitating easy deployment and scaling across different environments. The application is cloud-ready, designed to leverage cloud services for storage, computation, and hosting, ensuring high availability and performance. 
Bounding boxes were used on the initial training images to improve accuracy is the integration of bounding box annotations in the training process, which improves the model's focus on relevant features within the images, thereby enhancing its predictive accuracy. 

This project showcases the integration of cloud technologies with machine learning, emphasizing practical applications and continuous learning systems.

