package com.madronetek.admin.todo;

public enum Priorities {
    LOW(0),
    MEDIUM(1),
    HIGH(2);

    private final int  priority;
    Priorities(int priority){
        this.priority = priority;
    }

    int getPriority(){
        return priority;
    }

    public static void main(String[] args) {
        Priorities[] allPriorities = Priorities.values();
        for(Priorities d : allPriorities){
            System.out.println(d + " " + d.getPriority());
        }
    }
}


