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
        TextField(placeholder, text: $input)
            .padding()
            .border(Color.gray, width: 1)
    }
}

//struct FormInputView_Previews: PreviewProvider {
//    static var previews: some View {
//        FormInputView()
//    }
//}
