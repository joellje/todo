//
//  TodoScreen.swift
//  mobile
//
//  Created by Joel Lim on 26/2/23.
//

import SwiftUI



struct TodosView: View {
    let token = ProcessInfo.processInfo.environment["token"]
    @AppStorage("stage") var stage: String = "todos"
    @State var errorMessages = [String]()
    @State var errorMessagesString = ""
    @State var hasErrors = false
    
    struct Todo: Codable, Identifiable {
        var id: String
        var task: String
        var completed: Bool
        var userId: String
        
        enum CodingKeys: String, CodingKey {
            case id = "_id"
            case task
            case completed
            case userId
        }
    }
    
    @State var todoArray = [Todo]()
    @State var newTask = ""
    
    
    func handleCreateTodo(){
        guard let url = URL(string: "http://localhost:5000/todos/") else {
            print("Invalid URL")
            return
        }
        
        guard let bodyData = try? JSONSerialization.data(withJSONObject: ["task": newTask]) else { return }
        
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue(token, forHTTPHeaderField: "authorization")
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = bodyData
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            
            if let error = error {
                print("Error: \(error.localizedDescription)")
            } else if let data = data, let response = response as? HTTPURLResponse {
                do {
                    let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any]
                    if response.statusCode != 200 {
                        if let dictionary = json, let messages = dictionary["messages"] as? [String] {
                            errorMessages = messages
                            errorMessagesString = errorMessages.joined(separator: "\n")
                            hasErrors = true
                            print("Response: \(errorMessages)")
                        }
                    } else {
                        newTask = ""
                        handleGetTodos()
                    }
                    
                } catch {
                    print("Error parsing JSON: \(error.localizedDescription)")
                }
            }
        }.resume()
        
    }
    
    func handleGetTodos() {
        guard let url = URL(string: "http://localhost:5000/todos/") else {
            print("Invalid URL")
            return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        request.setValue(token, forHTTPHeaderField: "authorization")
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            
            if let error = error {
                print("Error: \(error.localizedDescription)")
            } else if let data = data {
                do {
                    let decoder = JSONDecoder()
                    let todos = try decoder.decode([Todo].self, from: data)
                    todoArray = todos
                } catch {
                    print("Error parsing JSON: \(error.localizedDescription)")
                }
            }
        }.resume()
    }
    
    func handleDeleteAll() {
        guard let url = URL(string: "http://localhost:5000/todos/") else {
            print("Invalid URL")
            return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "DELETE"
        request.setValue(token, forHTTPHeaderField: "authorization")
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                print("Error: \(error.localizedDescription)")
            } else if let data = data {
                handleGetTodos()
                if let responseString = String(data: data, encoding: .utf8) {
                    print("Response: \(responseString)")
                }
            }
        }.resume()
    }
    
    func handleCompleteAll() {
        guard let url = URL(string: "http://localhost:5000/todos/") else {
            print("Invalid URL")
            return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "PUT"
        request.setValue(token, forHTTPHeaderField: "authorization")
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                print("Error: \(error.localizedDescription)")
            } else if let data = data {
                handleGetTodos()
                if let responseString = String(data: data, encoding: .utf8) {
                    print("Response: \(responseString)")
                }
            }
        }.resume()
    }
    var body: some View {
        ZStack {
            Color("ColorBackground")
                .ignoresSafeArea(.all, edges:.all)
            
            VStack {
                Button(action: {
                    stage = "onboarding"
                }) {
                    HStack {
                        Image(systemName: "chevron.left")
                            .font(.system(size: 16, weight: .semibold))
                        Text("Logout")
                            .fontWeight(.semibold)
                        Spacer()
                    }.padding(.leading, 10)
                }
                
                // MARK: - HEADER
                Text("Todos:").font(.largeTitle)
                SecondaryButtonView(text: "Delete All Todos") {
                    handleDeleteAll()
                }
                
                SecondaryButtonView(text: "Complete All Todos") {
                    handleCompleteAll()
                }
                
                Spacer()
                
                // MARK: - TODOS
                ScrollView(.vertical) {
                    VStack(spacing:10) {
                        ForEach(todoArray) { (todo: Todo) in
                            TodoView(id: todo.id, name: todo.task, completed: todo.completed, handleGetTodos: handleGetTodos)
                        }
                    }
                }.padding(.vertical, 2)
                
                Spacer()
                
                FormLabelView(label: "Enter your Task:")
                FormInputView(placeholder: "Task", input: $newTask)

                PrimaryButtonView(text: "Create Todo") {
                    handleCreateTodo()
                }
            }
        }
        .onAppear {
            handleGetTodos()
        }.alert(
            "Input Errors",
            isPresented: $hasErrors
        ) {
            Button("Cancel") {
                hasErrors = false
                errorMessages = []
            }
        } message: {
            Text(errorMessagesString)
        }
    }
}

struct TodosView_Previews: PreviewProvider {
    static var previews: some View {
        TodosView()
    }
}
