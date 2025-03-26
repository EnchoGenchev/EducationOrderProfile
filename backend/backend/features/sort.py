class Teacher:
    def __init__(self, name, subject):
        self.name = name
        self.subject = subject

    def __str__(self):
        return f"{self.name}, {self.subject} subject."

def sort(objects, key_function):
    for i in range(1, len(objects)):
        key = objects[i]
        j = i - 1
        while j >= 0 and key_function(objects[j]) > key_function(key):
            objects[j + 1] = objects[j]  # Shift elements right
            j -= 1
        objects[j + 1] = key  # Insert in correct position
    



