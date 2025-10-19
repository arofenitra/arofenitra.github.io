from tkinter import Tk, Entry,Button,StringVar,Menu
import math
class Calculator:
    def __init__(self,master):
        master.title("Fikajiana")
        master.geometry("457x520+0+0")
        master.config(bg="#ddd")
        master.resizable(False,False)
        self.rad_deg=StringVar()
        self.rad_deg.set("RAD") #Default mode is radians
        self.master=master
        self.create_menu()
        
        
        self.equation=StringVar()
        self.entry_value=""
        
        Entry(width=30,bg="#fff",font=("Arial Bold",28),textvariable=self.equation).place(x=0,y=0)
        
        Button(width=11,height=4,text="(",relief="flat",bg="#aaa",command=lambda:self.show("(")).place(x=0,y=100)
        Button(width=11,height=4,text=")",relief="flat",bg="#aaa",command=lambda:self.show(")")).place(x=90,y=100)
        Button(width=11,height=4,text="%",relief="flat",bg="#aaa",command=lambda:self.show("%")).place(x=180,y=100)
        Button(width=11,height=4,text="1",relief="flat",bg="white",command=lambda:self.show(1)).place(x=0,y=175)
        Button(width=11,height=4,text="2",relief="flat",bg="white",command=lambda:self.show(2)).place(x=90,y=175)
        Button(width=11,height=4,text="3",relief="flat",bg="white",command=lambda:self.show(3)).place(x=180,y=175)
        Button(width=11,height=4,text="4",relief="flat",bg="white",command=lambda:self.show(4)).place(x=0,y=250)
        Button(width=11,height=4,text="5",relief="flat",bg="white",command=lambda:self.show(5)).place(x=90,y=250)
        Button(width=11,height=4,text="6",relief="flat",bg="white",command=lambda:self.show(6)).place(x=180,y=250)
        Button(width=11,height=4,text="7",relief="flat",bg="white",command=lambda:self.show(7)).place(x=0,y=325)
        Button(width=11,height=4,text="8",relief="flat",bg="white",command=lambda:self.show(8)).place(x=90,y=325)
        Button(width=11,height=4,text="9",relief="flat",bg="white",command=lambda:self.show(9)).place(x=180,y=325)
        Button(width=11,height=4,text="0",relief="flat",bg="white",command=lambda:self.show(0)).place(x=0,y=400)
        Button(width=11,height=4,text=".",relief="flat",bg="#aaa",command=lambda:self.show(".")).place(x=90,y=400)
        Button(width=11,height=4,text="+",relief="flat",bg="#aaa",command=lambda:self.show("+")).place(x=270,y=100)
        Button(width=11,height=4,text="-",relief="flat",bg="#aaa",command=lambda:self.show("-")).place(x=270,y=175)
        Button(width=11,height=4,text="*",relief="flat",bg="#aaa",command=lambda:self.show("*")).place(x=270,y=250)
        Button(width=11,height=4,text="/",relief="flat",bg="#aaa",command=lambda:self.show("/")).place(x=270,y=325)
        Button(width=11,height=4,text="C",relief="flat",bg="#aaa",command=lambda:self.clear()).place(x=180,y=400)
        
        Button(width=11, height=4, text="cos", relief="flat", bg="#a39", command=lambda: self.show("cos(")).place(x=360, y=250)
        Button(width=11, height=4, text="sin", relief="flat", bg="#a39", command=lambda: self.show("sin(")).place(x=360, y=175)
        Button(width=11, height=4, text="tan", relief="flat", bg="#a39", command=lambda: self.show("tan(")).place(x=360, y=325)
        Button(master, width=11, height=4, textvariable=self.rad_deg, command=self.toogle_rad_deg).place(x=360, y=100)
        Button(width=11, height=4, text="pi", relief="flat", bg="#a39", command=lambda: self.show("pi")).place(x=270,y=400)
        
        Button(width=11,height=4,text="=",relief="flat",bg="blue",command=self.solve).place(x=360,y=400)

        
        
    def toogle_rad_deg(self):
        if self.rad_deg.get()=="RAD":
            self.rad_deg.set("DEG")
        else:
            self.rad_deg.set("RAD")
    
    def calculate_trig(self, func, value):
        if self.rad_deg.get() == "RAD":
            return func(value)
        else:
            return func(math.radians(value))
    
    def show(self, value):
        self.entry_value += str(value)
        self.equation.set(self.entry_value)

    def clear(self):
        self.entry_value = " "
        self.equation.set(self.entry_value)

        
    def solve(self):
        try:
            self.entry_value = self.entry_value.replace('pi', str(math.pi))
            self.entry_value = self.entry_value.replace('cos(', 'self.calculate_trig(math.cos, ')
            self.entry_value = self.entry_value.replace('sin(', 'self.calculate_trig(math.sin, ')
            self.entry_value = self.entry_value.replace('tan(', 'self.calculate_trig(math.tan, ')
            result = eval(self.entry_value)
            self.equation.set(result)
        except Exception as e:
            self.equation.set("Error")
    
    def create_menu(self):
        menubar=Menu(self.master)
        root.config(menu=menubar)
        
        file_menu=Menu(menubar,tearoff=0)
        file_menu.add_command(label="calculator")
        file_menu.add_command(label="graph")
        file_menu.add_command(label="Exit",command=root.quit)
        
        menubar.add_cascade(label="file",menu=file_menu)
               

root=Tk()
calculator=Calculator(root)
root.mainloop()
