//
//  FormLabelView.swift
//  mobile
//
//  Created by Joel Lim on 28/2/23.
//

import SwiftUI

struct FormLabelView: View {
    var label = ""
    var body: some View {
        Text(label)
            .foregroundColor(.white)
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(.horizontal)
    }
}

struct FormLabelView_Previews: PreviewProvider {
    static var previews: some View {
        FormLabelView()
    }
}
