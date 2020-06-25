package com.thetis.yarnliving.invoicehandler.function;

import java.net.URL;
import java.util.Arrays;

import com.amazonaws.client.builder.AwsClientBuilder.EndpointConfiguration;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.textract.AmazonTextract;
import com.amazonaws.services.textract.AmazonTextractClientBuilder;
import com.amazonaws.services.textract.model.DocumentLocation;
import com.amazonaws.services.textract.model.NotificationChannel;
import com.amazonaws.services.textract.model.S3Object;
import com.amazonaws.services.textract.model.StartDocumentAnalysisRequest;
import com.amazonaws.services.textract.model.StartDocumentAnalysisResult;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.thetis.pack.client.model.Event;
import com.thetis.pack.client.model.EventDetail;

public class Starter implements RequestHandler<Event, String> {

	private String completionTopic = System.getenv("CompletionTopic");
	
	private String completionRole = System.getenv("CompletionRole");
	
	private String bucketName = System.getenv("BucketName");
	
    @Override
    public String handleRequest(Event event, Context context) {
    	
        context.getLogger().log("Received event: " + event);
        
		AmazonS3 s3Client = AmazonS3ClientBuilder.defaultClient();

        try {

        	EventDetail detail = event.getDetail();
        	
        	String key = detail.getEntityId() + ".pdf";
        	
        	URL url = new URL(detail.getUrl());
    		s3Client.putObject(bucketName, key, url.openStream(), new ObjectMetadata());
        	
            EndpointConfiguration endpoint = new EndpointConfiguration(
                    "https://textract.eu-west-1.amazonaws.com", "eu-west-1");
            AmazonTextract client = AmazonTextractClientBuilder.standard()
                    .withEndpointConfiguration(endpoint).build();

            StartDocumentAnalysisRequest request = new StartDocumentAnalysisRequest()
            		.withDocumentLocation(new DocumentLocation().withS3Object(new S3Object().withName(key).withBucket(bucketName)))
            		.withNotificationChannel(new NotificationChannel().withSNSTopicArn(completionTopic).withRoleArn(completionRole))
            		.withClientRequestToken(detail.getEventId())
            		.withJobTag(detail.getEntityId().toString() + "_" + detail.getEventId())
            		.withFeatureTypes(Arrays.asList("TABLES", "FORMS"));

            StartDocumentAnalysisResult result = client.startDocumentAnalysis(request);
            
            ObjectMapper mapper = new ObjectMapper();
            System.out.println(mapper.writeValueAsString(result));
            
            return null;
            
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
}