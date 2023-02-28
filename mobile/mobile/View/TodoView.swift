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
        ZStack {
            RoundedRectangle(cornerRadius: 8)
                .fill(Color.white)
                .shadow(color: Color.gray.opacity(0.4), radius: 4, x: 0, y: 2)
                .padding(.horizontal)
                .frame(height: 50)
            
            HStack {
                Text(name)
                    .fontWeight(.semibold)
                    .lineLimit(1)
                    .truncationMode(.tail)
                
                Spacer()
                
                completed ? Button(action: {
                    handleToggle()
                }) {
                    Image(systemName: "checkmark.square")
                }: Button(action: {
                    handleToggle()
                }) {
                    Image(systemName: "square")
                }
                
                Button("Delete") {
                    handleDelete()
                }
            }.padding(.horizontal, 26)
        }.padding(.bottom, 5)
        
    }
}

//struct TodoView_Previews: PreviewProvider {
//    static var previews: some View {
//        TodoView(id: "1", name: "test", completed: true, handleGetTodos: nil)
//    }
//}
