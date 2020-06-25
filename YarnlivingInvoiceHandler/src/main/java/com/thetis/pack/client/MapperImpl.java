package com.thetis.pack.client;

import java.io.IOException;
import java.io.InputStream;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.thetis.pack.client.Mapper;

public class MapperImpl extends ObjectMapper implements Mapper {

	private static final long serialVersionUID = 1L;

	public MapperImpl() {
		super.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
	}
	
	@Override
	public String writeAsJson(Object value) {
		try {
			return super.writeValueAsString(value);
		} catch (JsonProcessingException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public <T> T readAsJson(String s, Class<T> clazz) {
		try {
			return super.readValue(s, clazz);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public <T> T readAsJson(InputStream is, Class<T> clazz) {
		try {
			return super.readValue(is, clazz);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

}