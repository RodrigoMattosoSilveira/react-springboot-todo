package com.madronetek.reactspringboot;

public enum Priorities {
    LOW(0),
    MEDIUM(1),
    HIGH(2);

    final int priority;
    private Priorities(int priority) {
        this.priority = priority;
    }

    int getPriority() { return priority; }
}
