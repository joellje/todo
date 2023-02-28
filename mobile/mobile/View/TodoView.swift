//
//  TodoView.swift
//  mobile
//
//  Created by Joel Lim on 26/2/23.
//

import SwiftUI

struct TodoView: View {
    let token = ProcessInfo.processInfo.environment["token"]
    
    var id: String
    var name: String
    var completed: Bool
    var handleGetTodos: () -> Void

    
    func handleToggle() {
        guard let url = URL(string: "http://localhost:5000/todos/\(id)") else {
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
    
    func handleDelete() {
        guard let url = URL(string: "http://localhost:5000/todos/\(id)") else {
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
    
    var body: some View {
        HStack {
            Text(name)
                .fontWeight(.semibold)
            
            Spacer()
            
            completed ? Button("Completed") {
                handleToggle()
            }: Button("Incomplete") {
                handleToggle()
            }
            
            Button("Delete") {
                handleDelete()
            }
        }.padding(.horizontal, 20)
    }
}

//struct TodoView_Previews: PreviewProvider {
//    static var previews: some View {
//        TodoView(id: "1", name: "test", completed: true, handleGetTodos: nil)
//    }
//}
