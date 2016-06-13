package de.ifgi.gwot.SensorController;

import java.util.ArrayList;
import java.util.NoSuchElementException;

/**
 * Simple Implementation of ADT Queue.
 * If the queue reaches its maximum, oldest messages will be removed.
 *
 */
public class MessageQueue {
	
	private ArrayList<String> queue;
	private final int MAX = 1000;
	
	/**
	 * Creates a simple queue.
	 */
	public MessageQueue(){
		this.queue = new ArrayList<String>();
	}
	
	/**
	 * Adds new elements to the queue.
	 * If the queue is full, oldest elements will be
	 * removed.
	 * @param message The message to append to the queue.
	 */
	public void enqueue(String message){
		while(this.queue.size() > MAX)
			dequeue();
		this.queue.add(message);
	}
	
	/**
	 * Returns the first element of the queue.
	 * @return The first element of the queue.
	 */
	public String front(){
		if(isEmpty())
			throw new NoSuchElementException("The queue is empty!");
		return this.queue.get(0);
	}
	
	/**
	 * Removes the first element of the queue and returns it.
	 * @return The first element of the queue.
	 */
	public String dequeue(){
		if(isEmpty())
			throw new NoSuchElementException("The queue is empty");
		return this.queue.remove(0);
	}
	
	/**
	 * Checks if the queue is empty.
	 * @return true if the queue is empty.
	 */
	public boolean isEmpty(){
		return this.queue.isEmpty();
	}

}
