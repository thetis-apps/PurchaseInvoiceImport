
package com.thetis.yarnliving.invoicehandler.model;

import java.util.HashMap;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "S3ObjectName",
    "S3Bucket"
})
public class DocumentLocation {

    @JsonProperty("S3ObjectName")
    private String s3ObjectName;
    @JsonProperty("S3Bucket")
    private String s3Bucket;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("S3ObjectName")
    public String getS3ObjectName() {
        return s3ObjectName;
    }

    @JsonProperty("S3ObjectName")
    public void setS3ObjectName(String s3ObjectName) {
        this.s3ObjectName = s3ObjectName;
    }

    @JsonProperty("S3Bucket")
    public String getS3Bucket() {
        return s3Bucket;
    }

    @JsonProperty("S3Bucket")
    public void setS3Bucket(String s3Bucket) {
        this.s3Bucket = s3Bucket;
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    @JsonAnySetter
    public void setAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
    }

}
