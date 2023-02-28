//
//  FormInputView.swift
//  mobile
//
//  Created by Joel Lim on 28/2/23.
//

import SwiftUI

struct FormInputView: View {
    var placeholder = ""
    @Binding var input: String
    
    var body: some View {
        ZStack {
            RoundedRectangle(cornerRadius: 8)
                .fill(Color.white)
                .shadow(color: Color.gray.opacity(0.4), radius: 4, x: 0, y: 2)
                .padding(.horizontal)
                .frame(height: 50)
            TextField(placeholder, text: $input)
                .padding(.horizontal, 26)
        }.padding(.bottom, 10)
    }
}

//struct FormInputView_Previews: PreviewProvider {
//    static var previews: some View {
//        FormInputView()
//    }
//}
