
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
    "JobId",
    "Status",
    "API",
    "JobTag",
    "Timestamp",
    "DocumentLocation"
})
public class Completion {

    @JsonProperty("JobId")
    private String jobId;
    @JsonProperty("Status")
    private String status;
    @JsonProperty("API")
    private String aPI;
    @JsonProperty("JobTag")
    private String jobTag;
    @JsonProperty("Timestamp")
    private Long timestamp;
    @JsonProperty("DocumentLocation")
    private DocumentLocation documentLocation;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("JobId")
    public String getJobId() {
        return jobId;
    }

    @JsonProperty("JobId")
    public void setJobId(String jobId) {
        this.jobId = jobId;
    }

    @JsonProperty("Status")
    public String getStatus() {
        return status;
    }

    @JsonProperty("Status")
    public void setStatus(String status) {
        this.status = status;
    }

    @JsonProperty("API")
    public String getAPI() {
        return aPI;
    }

    @JsonProperty("API")
    public void setAPI(String aPI) {
        this.aPI = aPI;
    }

    @JsonProperty("JobTag")
    public String getJobTag() {
        return jobTag;
    }

    @JsonProperty("JobTag")
    public void setJobTag(String jobTag) {
        this.jobTag = jobTag;
    }

    @JsonProperty("Timestamp")
    public Long getTimestamp() {
        return timestamp;
    }

    @JsonProperty("Timestamp")
    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    @JsonProperty("DocumentLocation")
    public DocumentLocation getDocumentLocation() {
        return documentLocation;
    }

    @JsonProperty("DocumentLocation")
    public void setDocumentLocation(DocumentLocation documentLocation) {
        this.documentLocation = documentLocation;
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
